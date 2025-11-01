import { pgTable, uuid, varchar, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    code: varchar("code", { length: 255 }).notNull(),
    amount: integer("amount").notNull(),
    isPaid: boolean("is_paid").notNull().default(false),
    method: varchar("method", { length: 255 }).notNull(),
    metadata: json("metadata").notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});