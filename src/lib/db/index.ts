import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";

// Prefer Vite's import.meta.env during dev/SSR, fallback to process.env
const DATABASE_URL = (import.meta as any).env?.DATABASE_URL ?? process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Define it in your .env (or .env.local) at project root, e.g. DATABASE_URL=postgresql://..."
  );
}

const sql = neon(process.env.DATABASE_URL || "")
export const db = drizzle({client: sql});
