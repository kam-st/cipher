import crypto from "crypto";

import { eq } from "drizzle-orm";
import { v4 as uuidV4 } from "uuid";

import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import {
  PasswordResetTokenTable,
  TwoFactorTokenTable,
  VerificationTokenTable,
} from "@/drizzle/schema";

import { db } from "./db";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const exisitingToken = await getTwoFactorTokenByEmail(email);

  if (exisitingToken) {
    await db
      .delete(TwoFactorTokenTable)
      .where(eq(TwoFactorTokenTable.email, exisitingToken.email));
  }

  const twoFactorToken = await db
    .insert(TwoFactorTokenTable)
    .values({ email: email, token: token, expires: expires })
    .returning();

  return twoFactorToken[0];
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const exisitingToken = await getPasswordResetTokenByEmail(email);

  if (exisitingToken) {
    await db
      .delete(PasswordResetTokenTable)
      .where(eq(PasswordResetTokenTable.email, exisitingToken.email));
  }

  const PasswordResetToken = await db
    .insert(PasswordResetTokenTable)
    .values({ email: email, token: token, expires: expires })
    .returning();

  return PasswordResetToken[0];
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const exisitingToken = await getVerificationTokenByEmail(email);

  if (exisitingToken) {
    await db
      .delete(VerificationTokenTable)
      .where(eq(VerificationTokenTable.email, exisitingToken.email));
  }

  const verificationToken = await db
    .insert(VerificationTokenTable)
    .values({ email: email, token: token, expires: expires })
    .returning();

  return verificationToken[0];
};
