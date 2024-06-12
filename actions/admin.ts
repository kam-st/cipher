"use server";

import { UserRole } from "@/drizzle/schema";
import { currentRole } from "@/lib/auth";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.enumValues[0]) {
    return { success: "Allowed!" };
  }

  return { error: "Forbidden!" };
};
