import {createServerFn} from "@tanstack/react-start";
import {db} from "~/lib/db";
import {generatedCount} from "~/lib/db/schema";
import {eq} from "drizzle-orm";

export const incrementGeneratedCount = createServerFn().handler(async () => {
    try {
        // First, try to get the current count with id
        const currentCount = await db
            .select({id: generatedCount.id, count: generatedCount.count})
            .from(generatedCount)
            .limit(1);

        if (currentCount.length > 0 && currentCount[0]) {
            // Update existing count
            await db
                .update(generatedCount)
                .set({count: (currentCount[0].count || 0) + 1})
                .where(eq(generatedCount.id, currentCount[0].id));
        } else {
            // Insert new count record if none exists
            await db.insert(generatedCount).values({id: 1, count: 1});
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error incrementing generated count:", error);
        return {
            success: false,
            error: "Failed to increment generated count.",
        };
    }
});