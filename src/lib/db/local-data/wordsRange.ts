export const wordsCountRange = {
	veryShort: { min: 100, max: 300 },
	short: { min: 300, max: 500 },
	medium: { min: 500, max: 700 },
	long: { min: 700, max: 900 },
	extended: { min: 900, max: 1000 },
} as const;

export type WordsCountRange = keyof typeof wordsCountRange;
