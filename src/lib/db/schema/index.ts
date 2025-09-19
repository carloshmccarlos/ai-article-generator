import {
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// --- Articles Table ---

export const articles = pgTable("articles", {
	id: serial("id").primaryKey(),
	categoryName: varchar("category_name", { length: 100 }).notNull(),
	subcategory: varchar("subcategory", { length: 100 }).notNull(),
	level: varchar("level", { length: 50 }).notNull(),
	format: varchar("format", { length: 50 }).notNull(),
	wordsCountRange: varchar("word_count", { length: 50 }).notNull(),
	topic: text("topic"),
	offeredWords: jsonb("offered_words").$type<string[]>(),
	content: text("content").notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
