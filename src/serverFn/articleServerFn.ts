import { GoogleGenAI } from "@google/genai";
import {createServerFn} from "@tanstack/react-start";
import {desc} from "drizzle-orm";
import {parse} from "valibot";

import {db} from "~/lib/db";
import {advice, articles, userFeedback} from "~/lib/db/schema";
import {generateArticlePrompt} from "~/lib/prompt";
import {
    ArticleCreateSchema,
    ArticleGenerateSchema,

    ArticleResponseSchema,
    adviceSchema,
    recordFeedbackSchema,
} from "~/validation/articleSchema";



export const generateArticle = createServerFn()
    .inputValidator(ArticleGenerateSchema)
    .handler(async ({ data }) => {
        const prompt = generateArticlePrompt(data);

        // Retrieve keys and fail fast if neither is available
        const apiKeys = [process.env.GEMINI_API_KEY1, process.env.GEMINI_API_KEY2].filter(Boolean);
        if (apiKeys.length === 0) {
            console.error("No Gemini API keys are configured in the environment variables.");
            return {
                success: false,
                error: "Server configuration error: API keys are missing.",
                prompt: prompt,
            };
        }

        let lastError: any = null;
        const maxAttempts = 6;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Rotate through available keys
                const apiKey = apiKeys[(attempt - 1) % apiKeys.length];
                console.log(`Article generation attempt ${attempt}/${maxAttempts} using API key index ${(attempt - 1) % apiKeys.length}`);

                const ai = new GoogleGenAI({apiKey});


                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash-lite",
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
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
                                    description: "Markdown Formatting of Article without the title",
                                },
                                wordsCount: {
                                    type: "integer",
                                    description: "The total word count of the generated article content.",
                                },
                            },
                            required: ["title", "content", "wordsCount"],
                        },
                    },
                });

                // Check if response exists and has candidates
                if (!response || !response.candidates || response.candidates.length === 0) {
                    throw new Error("No candidates returned from AI model");
                }

                const candidate = response.candidates[0];
                if (!candidate || !candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
                    throw new Error("Invalid response structure from AI model");
                }

                const responseText = candidate.content.parts[0].text;
                if (!responseText || responseText.trim() === "") {
                    throw new Error("Received empty response text from AI model");
                }

                console.log("Raw AI response:", responseText.substring(0, 200) + "...");

                // Parse the JSON response with better error handling
                let jsonResponse;
                try {
                    jsonResponse = JSON.parse(responseText);
                } catch (parseError: any) {
                    console.error("JSON parse error:", parseError);
                    console.error("Raw response:", responseText);
                    throw new Error(`Failed to parse JSON response: ${parseError?.message || 'Unknown parse error'}`);
                }

                // Validate against schema with better error handling
                let parsedResponse;
                try {
                    parsedResponse = parse(ArticleResponseSchema, jsonResponse);
                } catch (validationError: any) {
                    console.error("Schema validation error:", validationError);
                    console.error("JSON response:", jsonResponse);
                    throw new Error(`Response validation failed: ${validationError?.message || 'Unknown validation error'}`);
                }

                console.log("Successfully generated and parsed article.");
                return {
                    success: true,
                    article: parsedResponse.content,
                    title: parsedResponse.title,
                    wordCount: parsedResponse.wordsCount,
                    prompt: prompt,
                };

            } catch (error) {
                console.error(`Article generation attempt ${attempt} failed:`, error);
                lastError = error;

                if (attempt === maxAttempts) {
                    break; // Don't wait after the final attempt
                }

                // Exponential backoff: 2s, 4s, 8s, 16s, 32s
                const delay = Math.pow(2, attempt) * 1000;
                console.log(`Waiting ${delay / 1000}s before retrying...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        // If the loop completes without a successful return, all attempts have failed.
        console.error("All article generation attempts failed.", lastError);
        return {
            success: false,
            error: `Failed to generate article after ${maxAttempts} attempts. Last error: ${lastError?.message || "An unknown error occurred."}`,
            prompt: prompt,
        };
    });


export const createArticle = createServerFn()
    .inputValidator(ArticleCreateSchema)
    .handler(async ({data}) => {
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
                    offeredWords: data.offeredWords && data.offeredWords.trim().length > 0
                        ? data.offeredWords
                        : null,
                    content: data.content,
                })
                .returning({id: articles.id});

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
    .handler(async ({data}) => {
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
    .handler(async ({data}) => {
        try {
            const result = await db
                .insert(advice)
                .values({
                    content: data.content,
                })
                .returning({id: advice.id});

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
