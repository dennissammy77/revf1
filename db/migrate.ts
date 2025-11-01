import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

export const migrateDB = async () => {
  await migrate(drizzle(db), { migrationsFolder: "./db/migrations" });
  console.log("Database migrated successfully");
  await db.end();
};

migrateDB();