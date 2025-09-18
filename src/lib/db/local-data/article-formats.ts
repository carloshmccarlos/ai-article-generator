export type ArticleFormat = {
	name: string;
	description: string;
	structure: string;
	audience: string;
};

export const articleFormats: ArticleFormat[] = [
	{
		name: "Letter",
		description: "Formal or informal letters, personal or professional.",
		structure: "Greeting → Body → Closing",
		audience: "Students, professionals, casual readers",
	},
	{
		name: "Essay / Article",
		description: "Structured essays or blog articles on various topics.",
		structure: "Introduction → Body → Conclusion",
		audience: "Students, general readers, learners",
	},
	{
		name: "Report",
		description: "Analytical or academic reports, factual and structured.",
		structure:
			"Title → Abstract → Introduction → Body → Conclusion → References",
		audience: "Students, researchers, professionals",
	},
	{
		name: "Poetry",
		description: "Creative and expressive writing with rhythm or free verse.",
		structure: "Flexible: stanzas, rhymes, free verse",
		audience: "Creative writers, literature learners, general readers",
	},
	{
		name: "Story / Narrative",
		description: "Short stories or narratives, imaginative and descriptive.",
		structure: "Setting → Characters → Conflict → Resolution",
		audience: "Creative writing enthusiasts, students, storytellers",
	},
	{
		name: "Dialogue / Script",
		description: "Character-focused conversational scripts or dialogues.",
		structure: "Character names → Dialogue lines → Stage directions",
		audience: "Drama students, language learners, creative writers",
	},
	{
		name: "Review",
		description: "Evaluative articles reviewing books, movies, or products.",
		structure: "Introduction → Summary → Analysis → Recommendation",
		audience: "Students, general readers, critics",
	},
	{
		name: "Guide / Tutorial",
		description: "Step-by-step instructional content or how-to guides.",
		structure: "Introduction → Steps → Tips / Notes → Conclusion",
		audience: "Learners, DIY enthusiasts, professionals",
	},
	{
		name: "Opinion / Editorial",
		description: "Persuasive or argumentative content expressing opinions.",
		structure: "Hook → Argument → Evidence → Conclusion",
		audience: "Students, general readers, public forums",
	},
	{
		name: "Summary / Abstract",
		description: "Concise summaries of content or academic abstracts.",
		structure: "Key points → Main idea → Optional conclusion",
		audience: "Students, researchers, readers needing concise info",
	},
];
