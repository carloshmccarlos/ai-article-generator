import * as v from "valibot";

export const ArticleGenerateSchema = v.object({
	categoryName: v.string(),
	subcategory: v.string(),
	level: v.string(),
	format: v.string(),
	wordsCountRange: v.string(),
	topic: v.string(),
	offeredWords: v.array(v.string()),
	additionalNotes: v.string(),
});

export const ArticleCreateSchema = v.object({
	categoryName: v.string(),
	subcategory: v.string(),
	level: v.string(),
	format: v.string(),
	wordsCountRange: v.string(),
	topic: v.string(),
	offeredWords: v.array(v.string()),
	content: v.string(),
});

export const ArticleResponseSchema = v.object({
	title: v.string(),
	content: v.string(),
	wordsCount: v.number(),
});

export const recordFeedbackSchema = v.object({
	feedbackType: v.enum({
		satisfied: "satisfied",
		not_satisfied: "not_satisfied",
	}),
	articleTitle: v.string(),
});

export const adviceSchema = v.object({
	content: v.string(),
});

export type ArticleFormData = v.InferInput<typeof ArticleGenerateSchema>;
export type ArticleResponse = v.InferOutput<typeof ArticleResponseSchema>;
