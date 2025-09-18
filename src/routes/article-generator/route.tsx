import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { ArticleForm } from "~/components/article-generator/ArticleForm";
import { ArticlePreview } from "~/components/article-generator/ArticlePreview";
import type { FormData } from "~/components/article-generator/types";

export const Route = createFileRoute("/article-generator")({
	component: ArticleGenerator,
});

function ArticleGenerator() {
	const [formData, setFormData] = useState<FormData>({
		category: "",
		subcategory: "",
		level: "",
		format: "",
		topic: "",
		keywords: "",
		additionalNotes: "",
	});

	const [generatedArticle, setGeneratedArticle] = useState<string>("");
	const [isGenerating, setIsGenerating] = useState(false);

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (field === "category") {
			setFormData((prev) => ({ ...prev, subcategory: "" }));
		}
	};

	const generateArticle = async () => {
		setIsGenerating(true);
		// Simulate article generation
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const sampleArticle = `# ${formData.topic || "Sample Article"}

## Introduction

This is a ${formData.level.toLowerCase()} level article about **${formData.topic}** in the ${formData.category} category.

### Key Points

- **Keywords**: ${formData.keywords}
- **Format**: ${formData.format}
- **Level**: ${formData.level}

## Main Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

### Section 1

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra venerat.

### Section 2

Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.

## Conclusion

In conclusion, this article demonstrates the integration of user-provided keywords: **${formData.keywords}** into a well-structured ${formData.format.toLowerCase()}.

---

*Generated with AI Article Generator*`;

		setGeneratedArticle(sampleArticle);
		setIsGenerating(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-slate-900 mb-4">
						<Wand2 className="inline-block w-10 h-10 mr-3 text-blue-600" />
						AI Article Generator
					</h1>
					<p className="text-xl text-slate-600">
						Create professional articles with your keywords and preferences
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					<ArticleForm
						formData={formData}
						onChange={handleInputChange}
						onGenerate={generateArticle}
						isGenerating={isGenerating}
					/>
					<ArticlePreview content={generatedArticle} />
				</div>
			</div>
		</div>
	);
}

export default ArticleGenerator;
