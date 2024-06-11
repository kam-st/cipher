import { and, eq } from "drizzle-orm";

import {
  TwoFactorConfirmationTable,
  TwoFactorTokenTable,
} from "@/drizzle/schema";
import { db } from "@/lib/db";

export const getTwoFactorTokenByTokenEmail = async (
  token: string,
  email: string
) => {
  try {
    const twoFactorToken = await db.query.TwoFactorTokenTable.findFirst({
      where: and(
        eq(TwoFactorTokenTable.email, email),
        eq(TwoFactorTokenTable.token, token)
      ),
    });
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.query.TwoFactorTokenTable.findFirst({
      where: eq(TwoFactorTokenTable.email, email),
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
