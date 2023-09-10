import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
    path: '.env',
});

export default {
    schema: "./src/db/schema.ts",
    driver: 'pg',
    out: './src/db/migrations',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    }
} satisfies Config;
