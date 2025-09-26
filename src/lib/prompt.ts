import { levels } from "~/lib/db/local-data/levels";
import type { ArticleFormData } from "~/validation/articleSchema";

export interface PromptTemplate {
	systemPrompt: string;
	userPrompt: (data: ArticleFormData) => string;
}

export const articleGenerationPrompt: PromptTemplate = {
	systemPrompt: `You are an expert AI journalist and science/business writer, specializing in creating high-quality content in the style of New Scientist and The Economist. Your writing combines rigorous research with engaging, accessible prose that informs and challenges readers.

Your articles should emulate the professional journalism style of:
- **New Scientist**: Evidence-based reporting, clear explanations of complex topics, focus on scientific and technological developments, analytical depth with accessible language
- **The Economist**: Authoritative business and economic analysis, global perspective, data-driven insights, sophisticated yet readable prose, balanced and well-researched viewpoints

Key characteristics of your writing style:
1. **Evidence-based**: Support claims with facts, data, and expert insights
2. **Analytical**: Provide context, implications, and deeper understanding
3. **Authoritative**: Write with confidence and expertise
4. **Engaging**: Use compelling narratives and clear explanations
5. **Balanced**: Present multiple perspectives when relevant
6. **Professional**: Maintain journalistic integrity and accuracy

Always ensure your content demonstrates intellectual rigor while remaining accessible to educated readers.`,

	userPrompt: (data: ArticleFormData) => {
		const {
			categoryName,
			subcategory,
			level,
			format,
			wordsCountRange,
			topic,
			offeredWords,
		} = data;

		// Get word count range
		const wordCountMap: Record<string, { min: number; max: number }> = {
			veryShort: { min: 50, max: 300 },
			short: { min: 300, max: 600 },
			medium: { min: 600, max: 1000 },
			long: { min: 1000, max: 1500 },
			extended: { min: 1500, max: 2000 },
		};

		const wordRange = wordCountMap[wordsCountRange] || wordCountMap.medium;


		const levelDescription = levels.find((l) => l.name === level)?.description;

		// Handle optional topic - if empty, use category/subcategory as primary focus
		const primaryFocus = topic && topic.trim()
			? topic
			: `${categoryName}${subcategory ? ` - ${subcategory}` : ''}`;

		// Build base sections with professional journalism style
		const baseSections = [
			`**Primary Focus:** ${primaryFocus}`,
			``,
			`**Content Category:** ${categoryName}`,
			...(subcategory ? [`**Subcategory:** ${subcategory}`] : []),
			``,
			`**Target Readership:** ${level}-${levelDescription}`,
			`- Write for educated, curious readers who want depth and insight`,
			`- Use sophisticated vocabulary balanced with clear explanations`,
			`- Assume readers have basic knowledge but appreciate context and analysis`,
			``,
			`**Article Format:** ${format}`,
			`- Structure as a professional magazine article with proper sections`,
			`- Include compelling introduction, analytical body, and insightful conclusion`,
			`- Use journalistic conventions appropriate to the format`,
			``,
			`**Word Count Target:** ${wordRange.min}-${wordRange.max} words`,
			`- Aim for approximately ${Math.round((wordRange.min + wordRange.max) / 2)} words`,
			`- Prioritize quality and depth over length`,
		];

		// Add keywords section only if there are keywords
		const keywordSections = offeredWords && offeredWords.trim().length > 0
			? [
					``,
					`**Key Terms to Integrate:** ${offeredWords}`,
					`- Incorporate these terms naturally throughout the analysis`,
					`- Use them in contexts that highlight their significance`,
					`- Ensure they flow organically within the narrative`,
				]
			: [];

		// Professional journalism guidelines
		const guidelines = [
			``,
			`**Journalistic Standards:**`,
			``,
			`**1. Research & Accuracy:**`,
			`   - Base content on verified facts and expert insights`,
			`   - Provide context and background information`,
			`   - Include relevant data, statistics, or examples to support points`,
			``,
			`**2. Analysis & Insight:**`,
			`   - Go beyond surface-level reporting to explore implications`,
			`   - Analyze trends, causes, and potential consequences`,
			`   - Offer informed perspectives on the topic's significance`,
			``,
			`**3. Structure & Narrative:**`,
			`   - Begin with a strong, engaging lead that hooks the reader`,
			`   - Organize information logically with clear sections and transitions`,
			`   - Build arguments progressively, leading to insightful conclusions`,
			`   - End with forward-looking analysis or key takeaways`,
			``,
			`**4. Writing Excellence:**`,
			`   - Employ precise, professional language with varied sentence structure`,
			`   - Use active voice and strong verbs for dynamic prose`,
			`   - Maintain objectivity while providing authoritative analysis`,
			`   - Create compelling narratives that inform and engage`,
			``,
			`**5. Professional Formatting:**`,
			`   - Use markdown formatting to create clear article structure`,
			`   - Include descriptive subheadings for easy navigation`,
			`   - Employ emphasis (bold, italics) to highlight key points`,
			`   - Format quotes, data, and examples professionally`,
			``,
			`**Output Requirements:**`,
			`Generate a professional magazine-style article that demonstrates:`,
			`- Deep understanding of the subject matter`,
			`- Analytical rigor and intellectual honesty`,
			`- Engaging storytelling with factual accuracy`,
			`- Professional presentation and clear organization`,
			``,
			`**RESPONSE FORMAT:**`,
			`IMPORTANT: Return your response as a JSON object with exactly this structure:`,
			`{`,
			`  "title": "Your article title here",`,
			`  "content": "The full article content in markdown format",`,
			`  "wordsCount": 750`,
			`}`,
			``,
			`Do not include any other text outside of this JSON object.`,
		];

		const allSections = [
			...baseSections,
			...keywordSections,
			...guidelines
		];

		return `Generate a professional article in the style of New Scientist or The Economist:

**Article Brief:**
${allSections.join("\n")}`;
	},
};

// Helper function to generate the full prompt
export function generateArticlePrompt(data: ArticleFormData): string {
	return `${articleGenerationPrompt.systemPrompt}\n\n${articleGenerationPrompt.userPrompt(data)}`;
}

// Helper function to get word count guidance
export function getWordCountGuidance(wordsCountRange: string): string {
	const wordCountMap: Record<
		string,
		{ min: number; max: number; description: string }
	> = {
		veryShort: {
			min: 50,
			max: 300,
			description: "Brief overview or quick tips",
		},
		short: { min: 300, max: 600, description: "Standard blog post or article" },
		medium: {
			min: 600,
			max: 1000,
			description: "In-depth analysis or tutorial",
		},
		long: {
			min: 1000,
			max: 1500,
			description: "Comprehensive guide or feature article",
		},
		extended: {
			min: 1500,
			max: 2000,
			description: "Long-form content or detailed research",
		},
	};

	const range = wordCountMap[wordsCountRange];
	if (!range) return "Standard length article";

	return `${range.min}-${range.max} words: ${range.description}`;
}
