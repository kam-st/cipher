import { eq } from "drizzle-orm";

import { VerificationTokenTable } from "@/drizzle/schema";
import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db
      .selectDistinct()
      .from(VerificationTokenTable)
      .where(eq(VerificationTokenTable.token, token));

    return verificationToken[0];
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(VerificationTokenTable)
      .where(eq(VerificationTokenTable.email, email))
      .limit(1);

    return verificationToken[0];
  } catch {
    return null;
  }
};
