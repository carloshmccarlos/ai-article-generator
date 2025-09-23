import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		VITE_BASE_URL: z.url().default("http://localhost:3000"),
		GEMINI_API_KEY: z.string(),
	},
	runtimeEnv: process.env,
});
