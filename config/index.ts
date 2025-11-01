import "dotenv";

export const CONFIG = {
	db: {
		URL: process.env.DATABASE_URL || ""
	}
};
