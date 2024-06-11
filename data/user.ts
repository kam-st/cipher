import { eq } from "drizzle-orm";

import { UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    return user[0];
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(UserTable).where(eq(UserTable.id, id));

    return user[0];
  } catch (e) {
    return null;
  }
};
