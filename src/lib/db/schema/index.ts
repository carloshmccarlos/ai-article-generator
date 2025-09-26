import {
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
	offeredWords: varchar("offered_words"),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const advice = pgTable("advice", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userFeedback = pgTable("user_feedback", {
	id: serial("id").primaryKey(),
	feedbackType: varchar("feedback_type", { length: 50 }).notNull(), // "satisfied", "not_satisfied", etc.
	articleTitle: varchar("article_title", { length: 255 }), // Optional: title of the article they were reviewing
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
