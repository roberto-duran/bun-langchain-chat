import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    uniqueIndex
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user",
    {
        id: text("id").notNull().primaryKey(),
        name: text("name"),
        email: text("email").notNull(),
        emailVerified: timestamp("emailVerified", { mode: "date" }),
        image: text("image"),
        created_at: timestamp('created_at').notNull().defaultNow(),
    },
    user => ({
        emailIndex: uniqueIndex('users_email_idx').on(user.email),
    }));

export const accounts = pgTable(
    "account",
    {
        id: text("id").notNull().primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    }
);

export const sessions = pgTable("session", {
    id: text("id").notNull().primaryKey(),
    sessionToken: text("sessionToken").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        created_at: timestamp('created_at').notNull().defaultNow(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);