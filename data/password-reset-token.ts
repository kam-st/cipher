import { and, eq } from "drizzle-orm";

import { PasswordResetTokenTable } from "@/drizzle/schema";
import { db } from "@/lib/db";

export const getPasswordResetTokenByTokenEmail = async (
  token: string,
  email: string
) => {
  try {
    const passwordResetToken = await db.query.PasswordResetTokenTable.findFirst(
      {
        where: and(
          eq(PasswordResetTokenTable.email, email),
          eq(PasswordResetTokenTable.token, token)
        ),
      }
    );

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.PasswordResetTokenTable.findFirst(
      { where: eq(PasswordResetTokenTable.email, email) }
    );

    // const passwordResetToken = await db.passwordResetToken.findFirst({
    //   where: {
    //     email,
    //   },
    // });

    return passwordResetToken;
  } catch {
    return null;
  }
};
