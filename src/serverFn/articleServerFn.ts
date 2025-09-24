import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { parse } from "valibot";

import { db } from "~/lib/db";
import { advice, articles, userFeedback } from "~/lib/db/schema";
import { generateArticlePrompt } from "~/lib/prompt";
import { parseOfferedWords } from "~/lib/utils";
import {
	ArticleCreateSchema,
	ArticleGenerateSchema,
	type ArticleResponse,
	ArticleResponseSchema,
	adviceSchema,
	recordFeedbackSchema,
} from "~/validation/articleSchema";

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY || "",
});

export const generateArticle = createServerFn()
	.inputValidator(ArticleGenerateSchema)
	.handler(async ({ data }) => {
		const prompt = generateArticlePrompt(data);

		try {
			const response = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: prompt,

				config: {
					responseMimeType: "application/json",
					responseSchema: {
						type: "object",
						properties: {
							title: {
								type: "string",
								description: "The title of this article",
							},
							content: {
								type: "string",
								description: "Markdown Formatting of Article without title",
							},
							wordsCount: {
								type: "integer",
								description: "The count of the whole article words.",
							},
						},
					},
				},
			});

			const generatedArticle =
				response.candidates?.[0]?.content?.parts?.[0]?.text || "";

			// Parse the JSON response according to the schema
			let parsedResponse: ArticleResponse;

			try {
				// Parse the JSON string response into an object
				const jsonResponse = JSON.parse(generatedArticle);
				parsedResponse = parse(ArticleResponseSchema, jsonResponse);
			} catch (parseError) {
				console.error("Error parsing AI response:", parseError);
				return {
					success: false,
					error: "Failed to parse article response. Please try again.",
					prompt: prompt,
				};
			}

			return {
				success: true,
				article: parsedResponse.content,
				title: parsedResponse.title,
				wordCount: parsedResponse.wordsCount,
				prompt: prompt, // Optionally include the prompt for debugging
			};
		} catch (error) {
			console.error("Error generating article:", error);
			return {
				success: false,
				error: "Failed to generate article. Please try again.",
				prompt: prompt,
			};
		}
	});

export const createArticle = createServerFn()
	.inputValidator(ArticleCreateSchema)
	.handler(async ({ data }) => {
		try {
			const result = await db
				.insert(articles)
				.values({
					title: data.title,
					categoryName: data.categoryName,
					subcategory: data.subcategory,
					level: data.level,
					format: data.format,
					wordsCountRange: data.wordsCountRange,
					topic: data.topic,
					offeredWords:
						parseOfferedWords(data.offeredWords).length > 0
							? parseOfferedWords(data.offeredWords)
							: null,
					content: data.content,
				})
				.returning({ id: articles.id });

			return {
				success: true,
				articleId: result[0].id,
			};
		} catch (error) {
			console.error("Error creating article:", error);
			return {
				success: false,
				error: "Failed to save article. Please try again.",
			};
		}
	});

export const recordFeedback = createServerFn()
	.inputValidator(recordFeedbackSchema)
	.handler(async ({ data }) => {
		try {
			await db.insert(userFeedback).values({
				feedbackType: data.feedbackType,
				articleTitle: data.articleTitle,
			});

			return {
				success: true,
			};
		} catch (error) {
			console.error("Error recording feedback:", error);
			return {
				success: false,
				error: "Failed to record feedback.",
			};
		}
	});

export const submitAdvice = createServerFn()
	.inputValidator(adviceSchema)
	.handler(async ({ data }) => {
		try {
			const result = await db
				.insert(advice)
				.values({
					content: data.content,
				})
				.returning({ id: advice.id });

			return {
				success: true,
				adviceId: result[0].id,
			};
		} catch (error) {
			console.error("Error submitting advice:", error);
			return {
				success: false,
				error: "Failed to submit advice. Please try again.",
			};
		}
	});

export const getRecentAdvice = createServerFn().handler(async () => {
	try {
		const recentAdvice = await db
			.select()
			.from(advice)
			.orderBy(desc(advice.createdAt))
			.limit(10);

		return {
			success: true,
			advice: recentAdvice,
		};
	} catch (error) {
		console.error("Error fetching advice:", error);
		return {
			success: false,
			error: "Failed to fetch advice.",
		};
	}
});
