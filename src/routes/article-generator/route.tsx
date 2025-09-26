import {createFileRoute} from "@tanstack/react-router";

import {useState} from "react";
import {ArticleForm} from "~/components/ArticleForm";
import {ArticlePreview} from "~/components/ArticlePreview";
import {FeedbackComponent} from "~/components/FeedbackComponent";
import Spinner from "~/components/Spinner";
import TitlePart from "~/components/TitlePart";
import TopBar from "~/components/TopBar";
import {generateArticle} from "~/serverFn/articleServerFn";
import type {ArticleFormData} from "~/validation/articleSchema";
import {Button} from "~/components/ui/button";

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
        setFormData((prev) => ({...prev, [field]: value}));
        if (field === "categoryName") {
            setFormData((prev) => ({...prev, subcategory: ""}));
        }
    };

    const handleGenerating = async () => {
        setIsGenerating(true);
        // Clear previous article while generating to avoid showing stale content
        setGeneratedArticle("");

        try {
            const response = await generateArticle({data: formData});

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
        <>
            <div className="flex flex-col gap-8 w-full  min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="max-w-7xl mx-auto ">
                    <TitlePart/>

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

                    {isGenerating && <Spinner/>}
                </div>

                <div className={'flex justify-end items-center'}>
                    <Button
                        type={"button"}
                        onClick={() =>
                            window.open("mailto:ai-article@loveyouall.qzz.io", "_blank")
                        }
                        variant="outline"
                        className="flex items-center gap-2 text-sm"
                    >
                        {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        Email me if you have need.
                    </Button>
                </div>
            </div>
        </>
    );
}
