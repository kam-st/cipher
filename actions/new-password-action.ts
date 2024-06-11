"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getPasswordResetTokenByTokenEmail } from "@/data/password-reset-token";
import { getUserbyEmail } from "@/data/user";
import { PasswordResetTokenTable, UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { NewPasswordSchema } from "@/lib/validations/auth";

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  email: string | null,
  token: string | null
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  if (!token || !email) {
    return { error: "Link is not valid!" };
  }

  const existingToken = await getPasswordResetTokenByTokenEmail(token, email);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserbyEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db
      .update(UserTable)
      .set({ password: hashedPassword })
      .where(eq(UserTable.email, existingToken.email));

    await db
      .delete(PasswordResetTokenTable)
      .where(eq(PasswordResetTokenTable.id, existingToken.id));
  } catch (e) {
    console.log("new-pasword.tsx", e);
  }

  return { success: "Password updated!" };
};
