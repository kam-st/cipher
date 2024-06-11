"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserbyEmail } from "@/data/user";
import {
  TwoFactorConfirmationTable,
  TwoFactorTokenTable,
} from "@/drizzle/schema";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { LoginSchema } from "@/lib/validations/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidated fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserbyEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email and password combination does not exist" };
  }

  if (existingUser && existingUser.password) {
    const { email, password } = validatedFields.data;

    if (!existingUser.password) {
      return null;
    }
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch)
      return { error: "Email and password combination does not exist" };
  }

  if (!existingUser.emailVerified) {
    //TODO: check here if the token alread exist and if it is valid. Then return you have not verified email, please verify email to complete registration. If token expired then genrate new token.
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return {
          error: "Invalid code!",
        };
      }

      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid code!",
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db
        .delete(TwoFactorTokenTable)
        .where(eq(TwoFactorTokenTable.id, twoFactorToken.id));

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db
          .delete(TwoFactorConfirmationTable)
          .where(eq(TwoFactorConfirmationTable.id, existingConfirmation.id));
      }

      await db
        .insert(TwoFactorConfirmationTable)
        .values({ userId: existingUser.id });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Sucessfully Logged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
