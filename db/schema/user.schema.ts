import { pgTable } from "drizzle-orm/pg-core";
import { serial, varchar, integer, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	username: varchar("username", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull().unique(),
	phone: varchar("phone", { length: 255 }).notNull().unique(),
	age: integer("age").default(0),
	avatar: varchar("avatar", { length: 255 }).default(""),
	gender: varchar("gender", { length: 255 }).default("I don't want to say"),
	role: varchar("role", { length: 255 }).default("user").notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	lastLogin: timestamp("last_login").notNull().defaultNow(),
	isActive: boolean("is_active").notNull().default(true),
	isVerified: boolean("is_verified").notNull().default(false),
	isDeleted: boolean("is_deleted").notNull().default(false),
	isSuspended: boolean("is_suspended").notNull().default(false),
	isLocked: boolean("is_locked").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});