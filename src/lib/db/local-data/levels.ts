export type Level = {
	name: string;
	description: string;
	cefr?: string; // optional CEFR mapping
};

export const levels: Level[] = [
	{
		name: "Beginner",
		description:
			"Designed for readers with basic understanding of the language. Uses short sentences, simple grammar, and everyday topics. Suitable for language learners, children, or anyone new to the subject. Articles focus on clarity and simplicity, often with examples or definitions of key terms.",
		cefr: "A1–A2",
	},
	{
		name: "Intermediate",
		description:
			"For readers with a moderate understanding. Includes more complex sentence structures and some academic or abstract topics. Suitable for students, casual learners, and general blog audiences. Articles provide explanations, examples, and may include comparisons or minor analysis.",
		cefr: "B1–B2",
	},
	{
		name: "Advanced",
		description:
			"Targeted at readers with strong comprehension. Uses formal writing, compound and complex sentences, and explores abstract or specialized topics. Suitable for academic reading, technical blogs, and professional content. Articles offer detailed analysis, structured arguments, and nuanced explanations.",
		cefr: "C1",
	},
	{
		name: "Expert",
		description:
			"For readers with near-native or professional fluency. Includes sophisticated language, long and complex sentences, and highly specialized or technical content. Suitable for research papers, whitepapers, and professional publications. Articles demonstrate deep analysis, critical thinking, and advanced argumentation.",
		cefr: "C2",
	},
	{
		name: "Creative",
		description:
			"Focuses on imaginative, narrative, or artistic writing. May vary in sentence length and complexity depending on style. Suitable for storytelling, poetry, fiction, and other creative works. Articles emphasize expression, worldbuilding, character development, and engaging the reader emotionally.",
	},
];
