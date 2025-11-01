import { pgTable, uuid, varchar, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { competitions } from "./competitions.schema";
import { users } from "./user.schema";
import { payments } from "./payments.schema";

export const rounds = pgTable("rounds", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
    competitionId: uuid("competition_id").references(() => competitions.id),
	description: varchar("description", { length: 255 }).notNull(),
    caption: varchar("caption", { length: 255 }),
	image: varchar("image", { length: 255 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    maxParticipants: integer("max_participants").notNull(),
    minParticipants: integer("min_participants").notNull(),
    maxPlaysPerParticipant: integer("max_plays_per_participant").notNull(),
    status: varchar("status", { length: 255 }).default("draft"),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const roundsParticipants = pgTable("rounds_participants", {
	id: uuid("id").defaultRandom().primaryKey(),
	roundId: uuid("round_id").references(() => rounds.id),
	userId: uuid("user_id").references(() => users.id),
    status: varchar("status", { length: 255 }).default("pending"),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    score: integer("score").notNull().default(0),
    rank: integer("rank").notNull().default(0),
    isPlayed: boolean("is_played").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const roundPlays = pgTable("round_plays", {
	id: uuid("id").defaultRandom().primaryKey(),
	roundId: uuid("round_id").references(() => rounds.id),
	userId: uuid("user_id").references(() => users.id),
    type: varchar("type", { length: 255 }).notNull(), // practice, hotlap, race, time trial, etc.
	bestTime: json("time"),
    bestScore: integer("score"),
    bestRank: integer("rank"),
    trackId: uuid("track_id").references(() => roundTracks.id),
    paymentId: uuid("payment_id").references(()=> payments.id),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const roundTracks = pgTable("round_tracks", {
    id: uuid("id").defaultRandom().primaryKey(),
    roundId: uuid("round_id").references(() => rounds.id),
    track: json("track").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const roundAwards = pgTable("round_awards", {
    id: uuid("id").defaultRandom().primaryKey(),
    roundId: uuid("round_id").references(() => rounds.id),
    award: json("award").notNull(),
    winnerId: uuid("winner_id").references(() => users.id),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});