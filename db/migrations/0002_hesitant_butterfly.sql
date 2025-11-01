CREATE TABLE "competition_awards" (
	"id" serial PRIMARY KEY NOT NULL,
	"competition_id" integer,
	"award" json NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_won" boolean DEFAULT false NOT NULL,
	"is_awarded" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_rejected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round_awards" (
	"id" serial PRIMARY KEY NOT NULL,
	"round_id" integer,
	"award" json NOT NULL,
	"winner_id" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_rejected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round_plays" (
	"id" serial PRIMARY KEY NOT NULL,
	"round_id" integer,
	"user_id" integer,
	"time" json,
	"score" integer,
	"rank" integer,
	"track_id" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_rejected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round_tracks" (
	"id" serial PRIMARY KEY NOT NULL,
	"round_id" integer,
	"track" json NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_rejected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rounds" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"competition_id" integer,
	"description" varchar(255) NOT NULL,
	"caption" varchar(255),
	"image" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"max_participants" integer NOT NULL,
	"min_participants" integer NOT NULL,
	"max_plays_per_participant" integer NOT NULL,
	"status" varchar(255) DEFAULT 'draft',
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rounds_participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"round_id" integer,
	"user_id" integer,
	"status" varchar(255) DEFAULT 'pending',
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"rank" integer DEFAULT 0 NOT NULL,
	"is_played" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "competition_awards" ADD CONSTRAINT "competition_awards_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_awards" ADD CONSTRAINT "round_awards_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_awards" ADD CONSTRAINT "round_awards_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_plays" ADD CONSTRAINT "round_plays_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_plays" ADD CONSTRAINT "round_plays_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_plays" ADD CONSTRAINT "round_plays_track_id_round_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."round_tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_tracks" ADD CONSTRAINT "round_tracks_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds_participants" ADD CONSTRAINT "rounds_participants_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."rounds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds_participants" ADD CONSTRAINT "rounds_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;