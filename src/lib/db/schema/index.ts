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
	wordCountLabel: varchar("word_count_label", { length: 50 }).notNull(),
	topic: text("topic").notNull(),
	offeredWords: jsonb("offered_words").$type<string[]>().notNull(),
	content: text("content").notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
