import { neon } from "@neondatabase/serverless";
import { serverOnly } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env/server";

const sql = neon(env.DATABASE_URL);
const getDatabase = serverOnly(() => drizzle({ client: sql }));

export const db = getDatabase();
