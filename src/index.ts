import { Hono } from "hono";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { user } from "../drizzle/schema";

const db = drizzle(sql);

const app = new Hono();

app.get("/", async (c) => {
  const result = await db.select().from(user);

  console.log(result);

  return c.json({
    data: result,
  });
});

export default app;
