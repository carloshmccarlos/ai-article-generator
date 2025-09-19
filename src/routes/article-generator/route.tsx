import { createFileRoute } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { ArticleForm } from "~/components/article-generator/ArticleForm";
import { ArticlePreview } from "~/components/article-generator/ArticlePreview";
import type { FormData } from "~/components/article-generator/types";
import { Button } from "~/components/ui/button";

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
	const [copied, setCopied] = useState(false);

	const hasArticle = generatedArticle.trim().length > 0;
	const showForm = !hasArticle || isGenerating;

	const copyArticle = async () => {
		try {
			await navigator.clipboard.writeText(generatedArticle);
			setCopied(true);
			setTimeout(() => setCopied(false), 1000);
		} catch (e) {
			console.error("Failed to copy article", e);
		}
	};

	const backToForm = () => {
		setGeneratedArticle("");
		// Optionally scroll back to top
		try {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch {}
	};

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (field === "category") {
			setFormData((prev) => ({ ...prev, subcategory: "" }));
		}
	};

	const generateArticle = async () => {
		setIsGenerating(true);
		// Clear previous article while generating to avoid showing stale content
		setGeneratedArticle("");
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

				<div className="grid gap-8 lg:grid-cols-1">
					{showForm && (
						<ArticleForm
							formData={formData}
							onChange={handleInputChange}
							onGenerate={generateArticle}
							isGenerating={isGenerating}
						/>
					)}
					{!isGenerating && hasArticle && (
						<div className="space-y-4">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div className="text-left">
									<h2 className="text-2xl font-semibold text-slate-900">
										Your Generated Article
									</h2>
									<p className="text-slate-600">
										Copy the result or go back to refine your inputs.
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Button
										variant="outline"
										onClick={copyArticle}
										className={`border-blue-200 ${copied ? "bg-green-50 text-green-700 border-green-200" : "text-blue-700 hover:bg-blue-50"}`}
										disabled={copied}
									>
										{copied ? "Copied!" : "Copy Article"}
									</Button>
									<Button
										onClick={backToForm}
										className="bg-blue-600 hover:bg-blue-700"
									>
										Back to Form
									</Button>
								</div>
							</div>
							<ArticlePreview content={generatedArticle} />
						</div>
					)}
				</div>

				{isGenerating && (
					<div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center">
						<output className="flex flex-col items-center" aria-live="polite">
							<svg
								className="animate-spin h-12 w-12 text-blue-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Generating</title>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								/>
							</svg>
							<p className="mt-4 text-slate-700">Generating your article...</p>
						</output>
					</div>
				)}
			</div>
		</div>
	);
}

export default ArticleGenerator;
