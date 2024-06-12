"use server";

import bcrypt from "bcryptjs";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { getUserById, getUserbyEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/lib/validations/settings";

import { UserTable } from "@/drizzle/schema";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  {
    /* TODO: Update this logic to work for both Oauth and credentials. If do not have password then, disable email change.  */
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserbyEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    if (user?.name === undefined || user.name === null) {
      user.name = "";
    }

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      user.name
    );

    return { success: "Verification email Sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
  }
  try {
    await db
      .update(UserTable)
      .set({ ...values })
      .where(eq(UserTable.id, dbUser.id));
  } catch (e) {
    console.log(e);
  }

  return { success: "Settings Updated!" };
};
