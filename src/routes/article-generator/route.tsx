import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";
import { ArticleForm } from "~/components/ArticleForm";
import { ArticlePreview } from "~/components/ArticlePreview";
import Spinner from "~/components/Spinner";
import TitlePart from "~/components/TitlePart";
import TopBar from "~/components/TopBar";
import { generateArticle } from "~/serverFn/genreate-article";
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
		additionalNotes: "",
	});

	const [generatedArticle, setGeneratedArticle] = useState<string>("");
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
		// Simulate article generation
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const { result } = await generateArticle({ data: formData });

		setGeneratedArticle(result);
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
							<ArticlePreview content={generatedArticle} />
						</>
					)}
				</div>

				{isGenerating && <Spinner />}
			</div>
		</div>
	);
}
