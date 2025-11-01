import { pgTable, uuid, varchar, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";

export const competitions = pgTable("competitions", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
    caption: varchar("caption", { length: 255 }),
	image: varchar("image", { length: 255 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    status: varchar("status", { length: 255 }).default("draft"),
    type: varchar("type", { length: 255 }).notNull(),
    tags: varchar("tags", { length: 255 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const competitionAwards = pgTable("competition_awards", {
    id: uuid("id").defaultRandom().primaryKey(),
    competitionId: uuid("competition_id").references(() => competitions.id),
    award: json("award").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    isWon: boolean("is_won").notNull().default(false),
    isAwarded: boolean("is_awarded").notNull().default(false),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});