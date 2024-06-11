import { relations } from "drizzle-orm/relations";

import {
  UserTable,
  AccountTable,
  SessionTable,
  TwoFactorConfirmationTable,
} from "./schema";

export const AccountRelations = relations(AccountTable, ({ one }) => ({
  User: one(UserTable, {
    fields: [AccountTable.userId],
    references: [UserTable.id],
  }),
}));

export const UserRelations = relations(UserTable, ({ many }) => ({
  Accounts: many(AccountTable),
  sessions: many(SessionTable),
  TwoFactorConfirmations: many(TwoFactorConfirmationTable),
}));

export const sessionsRelations = relations(SessionTable, ({ one }) => ({
  User: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id],
  }),
}));

export const TwoFactorConfirmationRelations = relations(
  TwoFactorConfirmationTable,
  ({ one }) => ({
    User: one(UserTable, {
      fields: [TwoFactorConfirmationTable.userId],
      references: [UserTable.id],
    }),
  })
);
