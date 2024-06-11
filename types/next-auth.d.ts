import NextAuth, { type DefaultSession } from "next-auth";

import { UserRole } from "@/drizzle/schema";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole.enumValues;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
