import * as v from "valibot";

export const ArticleGenerateSchema = v.object({
	categoryName: v.string(),
	subcategory: v.string(),
	level: v.string(),
	format: v.string(),
	wordsCountRange: v.string(),
	topic: v.string(),
	offeredWords: v.string(),
	additionalNotes: v.string(),
});

export type ArticleFormData = v.InferInput<typeof ArticleGenerateSchema>;
