import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./db/schema",
	out: "./db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		ssl: { rejectUnauthorized: false }
	},
	verbose: true,
	strict: true
});