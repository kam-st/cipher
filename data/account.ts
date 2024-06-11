import { eq } from "drizzle-orm";

import { AccountTable, UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.query.AccountTable.findFirst({
      where: eq(AccountTable.userId, userId),
    });

    return account;
  } catch {
    return null;
  }
};
