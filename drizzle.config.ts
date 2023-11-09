import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL || "",
  },
} satisfies Config;
