export const wordsCountRange = {
	veryShort: { min: 50, max: 300 },
	short: { min: 300, max: 600 },
	medium: { min: 600, max: 1000 },
	long: { min: 1000, max: 1500 },
	extended: { min: 1500, max: 2000 },
} as const;

export type WordsCountRange = keyof typeof wordsCountRange;
