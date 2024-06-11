import { sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  boolean,
  foreignKey,
  primaryKey,
  uuid,
  customType,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const UserRole = pgEnum("UserRole", ["ADMIN", "USER"]);

export const TwoFactorTokenTable = pgTable(
  "TwoFactorToken",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "date" }).notNull(),
  },
  (table) => {
    return {
      email_token_key: uniqueIndex("TwoFactorToken_email_token_key").using(
        "btree",
        table.email,
        table.token
      ),
    };
  }
);

export const VerificationTokenTable = pgTable(
  "VerificationToken",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "date" }).notNull(),
  },
  (table) => {
    return {
      email_token_key: uniqueIndex("VerificationToken_email_token_key").using(
        "btree",
        table.email,
        table.token
      ),
      token_key: uniqueIndex("VerificationToken_token_key").using(
        "btree",
        table.token
      ),
    };
  }
);

export const PasswordResetTokenTable = pgTable(
  "PasswordResetToken",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "date" }).notNull(),
  },
  (table) => {
    return {
      email_token_key: uniqueIndex("PasswordResetToken_email_token_key").using(
        "btree",
        table.email,
        table.token
      ),
    };
  }
);

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name"),
  lastName: text("lastName"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: UserRole("role").default("USER").notNull(),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
});

export const AccountTable = pgTable(
  "Account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => UserTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const SessionTable = pgTable("Session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const TwoFactorConfirmationTable = pgTable("TwoFactorConfirmation", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("userId")
    .notNull()
    .unique()
    .references(() => UserTable.id, {
      onDelete: "cascade",
    }),
});

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
