import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";
import { ArticleForm } from "~/components/ArticleForm";
import { ArticlePreview } from "~/components/ArticlePreview";
import { FeedbackComponent } from "~/components/FeedbackComponent";
import Spinner from "~/components/Spinner";
import TitlePart from "~/components/TitlePart";
import TopBar from "~/components/TopBar";
import { generateArticle } from "~/serverFn/articleServerFn";
import type { ArticleFormData } from "~/validation/articleSchema";

export const Route = createFileRoute("/article-generator")({
	component: ArticleGenerator,
});

function ArticleGenerator() {
	const [formData, setFormData] = useState<ArticleFormData>({
		categoryName: "",
		subcategory: "",
		level: "",
		wordsCountRange: "",
		format: "",
		topic: "",
		offeredWords: "",
	});

	const [generatedArticle, setGeneratedArticle] = useState<string>("");
	const [generatedTitle, setGeneratedTitle] = useState<string>("");
	const [wordCount, setWordCount] = useState<number>(0);
	const [isGenerating, setIsGenerating] = useState(false);

	const hasArticle = generatedArticle.trim().length > 0;
	const showForm = !hasArticle || isGenerating;

	const handleInputChange = (field: keyof ArticleFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (field === "categoryName") {
			setFormData((prev) => ({ ...prev, subcategory: "" }));
		}
	};

	const handleGenerating = async () => {
		setIsGenerating(true);
		// Clear previous article while generating to avoid showing stale content
		setGeneratedArticle("");

		try {
			const response = await generateArticle({ data: formData });

			if (response.success) {
				setGeneratedArticle(
					response.article || "No article content generated.",
				);
				// Store additional metadata if available
				if (response.title) {
					setGeneratedTitle(response.title);
				}
				if (response.wordCount) {
					setWordCount(response.wordCount);
				}
			} else {
				console.error("Article generation failed:", response.error);

				setGeneratedArticle(`Error: ${response.error}`);
			}
		} catch (error) {
			console.error("Error calling generateArticle:", error);
			setGeneratedArticle("An error occurred while generating the article.");
		}

		setIsGenerating(false);
	};

	return (
		<div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-7xl mx-auto ">
				<TitlePart />

				<div className=" grid gap-8 lg:grid-cols-1">
					{showForm && (
						<ArticleForm
							formData={formData}
							onChange={handleInputChange}
							onGenerate={handleGenerating}
							isGenerating={isGenerating}
						/>
					)}
					{!isGenerating && hasArticle && (
						<>
							<TopBar
								generatedArticle={generatedArticle}
								setGeneratedArticle={setGeneratedArticle}
							/>
							<ArticlePreview
								content={generatedArticle}
								title={generatedTitle}
								wordCount={wordCount}
							/>

							<FeedbackComponent
								article={generatedArticle}
								title={generatedTitle}
								formData={formData}
							/>
						</>
					)}
				</div>

				{isGenerating && <Spinner />}
			</div>
		</div>
	);
}
