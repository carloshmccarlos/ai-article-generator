import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";
import { env } from "~/env/server";
import { generateArticlePrompt } from "~/lib/prompt";
import { ArticleGenerateSchema } from "~/validation/articleSchema";

const ai = new GoogleGenAI({
	apiKey: env.GEMINI_API_KEY,
});

export const generateArticle = createServerFn()
	.validator(ArticleGenerateSchema)
	.handler(async ({ data }) => {
		const prompt = generateArticlePrompt(data);

		try {
			const response = await ai.models.generateContent({
				model: "gemini-2.5-pro",
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
							ieltsWordsCount: {
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
			let parsedResponse: {
				title: string;
				content: string;
				ieltsWordsCount: number;
			};

			try {
				parsedResponse = JSON.parse(generatedArticle);
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
				wordCount: parsedResponse.ieltsWordsCount,
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
