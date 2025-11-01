CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"code" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"method" varchar(255) NOT NULL,
	"metadata" json NOT NULL,
	"status" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "round_plays" ADD COLUMN "type" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "round_plays" ADD COLUMN "payment_id" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_plays" ADD CONSTRAINT "round_plays_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;