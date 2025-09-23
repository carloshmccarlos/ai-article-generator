import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely converts offeredWords to string array format
 * Handles both string and array inputs for backward compatibility
 */
export function parseOfferedWords(offeredWords: unknown): string[] {
	if (Array.isArray(offeredWords)) {
		// Already an array, filter out empty strings
		return offeredWords.filter((word): word is string => typeof word === 'string' && word.trim().length > 0);
	}

	if (typeof offeredWords === 'string' && offeredWords.trim()) {
		// Convert comma/semicolon-separated string to array
		return offeredWords.split(/[,;]/)
			.map(word => word.trim())
			.filter(word => word.length > 0);
	}

	// Handle null, undefined, or empty inputs
	return [];
}
