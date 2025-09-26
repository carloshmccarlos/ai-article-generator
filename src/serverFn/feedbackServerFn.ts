import {createServerFn} from "@tanstack/react-start";
import {adviceSchema, recordFeedbackSchema} from "~/validation/articleSchema";
import {db} from "~/lib/db";
import {advice, userFeedback} from "~/lib/db/schema";


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



