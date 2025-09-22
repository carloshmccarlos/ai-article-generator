import type { ArticleFormData } from "~/validation/articleSchema";

export interface PromptTemplate {
  systemPrompt: string;
  userPrompt: (data: ArticleFormData) => string;
}

export const articleGenerationPrompt: PromptTemplate = {
  systemPrompt: `You are an expert AI article writer specializing in creating high-quality, engaging content. You have extensive knowledge across various topics and can adapt your writing style to different formats, difficulty levels, and target audiences.

Your task is to generate well-researched, informative, and engaging articles based on the provided specifications. Always ensure your content is:

1. Accurate and factually correct
2. Well-structured and easy to read
3. Engaging and informative
4. Appropriate for the specified reading level
5. Optimized for the chosen format
6. Within the specified word count range
7. Relevant to the topic and keywords provided

When writing, focus on clarity, proper grammar, and maintaining reader interest throughout the article.`,

  userPrompt: (data: ArticleFormData) => {
    const {
      categoryName,
      subcategory,
      level,
      format,
      wordsCountRange,
      topic,
      offeredWords,
      additionalNotes
    } = data;

    // Get word count range
    const wordCountMap: Record<string, { min: number; max: number }> = {
      veryShort: { min: 50, max: 300 },
      short: { min: 300, max: 600 },
      medium: { min: 600, max: 1000 },
      long: { min: 1000, max: 1500 },
      extended: { min: 1500, max: 2000 }
    };

    const wordRange = wordCountMap[wordsCountRange] || wordCountMap.medium;

    // Format keywords for better integration
    const keywords = offeredWords
      .split(/[,;]/)
      .map(k => k.trim())
      .filter(k => k.length > 0);

    // Build base sections
    const baseSections = [
      `**Topic:** ${topic}`,
      ``,
      `**Category:** ${categoryName}`,
      `**Subcategory:** ${subcategory}`,
      ``,
      `**Reading Level:** ${level}`,
      `- Write at an appropriate complexity level for this audience`,
      `- Use vocabulary and sentence structures suitable for ${level} readers`,
      `- Avoid overly complex terminology unless necessary and explained`,
      ``,
      `**Format:** ${format}`,
      `- Structure the article according to ${format} conventions`,
      `- Include appropriate sections, headings, and formatting for this format`,
      ``,
      `**Word Count:** ${wordRange.min}-${wordRange.max} words`,
      `- Aim for approximately ${Math.round((wordRange.min + wordRange.max) / 2)} words`,
      `- Ensure the content is comprehensive but concise`,
    ];

    // Add keywords section only if there are keywords
    const keywordSections = keywords.length > 0 ? [
      ``,
      `**Keywords to Include:** ${keywords.join(', ')}`,
      `- Naturally integrate these keywords throughout the article`,
      `- Use them in headings, introductions, and key points where appropriate`,
      `- Don't force keywords unnaturally into the content`
    ] : [];

    // Add additional instructions section only if there are additional notes
    const additionalSections = additionalNotes && additionalNotes.trim().length > 0 ? [
      ``,
      `**Additional Instructions:** ${additionalNotes}`
    ] : [];

    // Writing guidelines
    const guidelines = [
      ``,
      `**Writing Guidelines:**`,
      ``,
      `1. **Content Quality:**`,
      `   - Ensure all information is accurate and up-to-date`,
      `   - Provide valuable insights and actionable information`,
      `   - Maintain objectivity and balance different perspectives when relevant`,
      ``,
      `2. **Structure & Flow:**`,
      `   - Create a logical flow from introduction to conclusion`,
      `   - Use clear, descriptive headings for easy navigation`,
      `   - Include smooth transitions between sections`,
      `   - End with a strong conclusion that summarizes key points`,
      ``,
      `3. **Engagement:**`,
      `   - Start with a compelling hook or interesting fact`,
      `   - Use storytelling elements when appropriate`,
      `   - Include relevant examples or case studies`,
      `   - Ask rhetorical questions to maintain reader interest`,
      ``,
      `4. **SEO Optimization:**`,
      `   - Include keywords in the title, introduction, and throughout the content`,
      `   - Use descriptive subheadings that include relevant keywords`,
      `   - Ensure the content is scannable with short paragraphs and bullet points`,
      ``,
      `5. **Technical Requirements:**`,
      `   - Use proper grammar, spelling, and punctuation`,
      `   - Maintain consistent tense and voice throughout`,
      `   - Format the article with appropriate markdown (headings, bold, italics, lists)`,
      `   - Include any relevant formatting specific to the ${format} style`,
      ``,
      `**Output Format:**`,
      `Please provide the article in a clean, readable format with:`,
      `- A compelling title`,
      `- Proper heading structure (H1, H2, H3 as appropriate)`,
      `- Well-organized paragraphs`,
      `- Bullet points or numbered lists where helpful`,
      `- Any relevant emphasis using bold or italics`,
      ``,
      `Generate a high-quality, original article that meets all these specifications.`
    ];

    const allSections = [
      ...baseSections,
      ...keywordSections,
      ...additionalSections,
      ...guidelines
    ];

    return `Please generate an article with the following specifications:

**Article Requirements:**
${allSections.join('\n')}`;
  }
};

// Helper function to generate the full prompt
export function generateArticlePrompt(data: ArticleFormData): string {
  return `${articleGenerationPrompt.systemPrompt}\n\n${articleGenerationPrompt.userPrompt(data)}`;
}

// Helper function to get word count guidance
export function getWordCountGuidance(wordsCountRange: string): string {
  const wordCountMap: Record<string, { min: number; max: number; description: string }> = {
    veryShort: { min: 50, max: 300, description: "Brief overview or quick tips" },
    short: { min: 300, max: 600, description: "Standard blog post or article" },
    medium: { min: 600, max: 1000, description: "In-depth analysis or tutorial" },
    long: { min: 1000, max: 1500, description: "Comprehensive guide or feature article" },
    extended: { min: 1500, max: 2000, description: "Long-form content or detailed research" }
  };

  const range = wordCountMap[wordsCountRange];
  if (!range) return "Standard length article";

  return `${range.min}-${range.max} words: ${range.description}`;
}