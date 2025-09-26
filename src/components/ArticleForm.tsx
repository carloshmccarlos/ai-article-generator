import { BookText, PenSquare, Sparkles, Tags } from "lucide-react";
import { useId } from "react";
import { CommonSelect, type SelectOption } from "~/components/CommonSelect";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { articleFormats } from "~/lib/db/local-data/article-formats";
import { categories } from "~/lib/db/local-data/categories";
import { levels } from "~/lib/db/local-data/levels";
import { wordsCountRange } from "~/lib/db/local-data/wordsRange";
import type { ArticleFormData } from "~/validation/articleSchema";
import { CategorySelect } from "./CategorySelect";

export function ArticleForm({
	formData,
	onChange,
	onGenerate,
	isGenerating,
}: {
	formData: ArticleFormData;
	onChange: (field: keyof ArticleFormData, value: string) => void;
	onGenerate: () => void;
	isGenerating: boolean;
}) {
	const topicId = useId();
	const keywordsId = useId();
	const notesId = useId();

	// Category selection is handled within CategorySelect component

	return (
		<Card className="rounded-none flex flex-col gap-4 h-fit  shadow-2xl  backdrop-blur-md">
			<CardHeader className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-b border-blue-100/50">
				<CardTitle className="flex items-center gap-3 text-slate-800">
					<div className="p-2 bg-blue-600 rounded-lg shadow-md">
						<Sparkles className="w-5 h-5 text-white" />
					</div>
					Article Configuration
				</CardTitle>
				<p className="text-sm text-blue-600/80 mt-2 font-medium">
					Set your preferences and provide a topic and keywords to get a
					high‑quality AI article.
				</p>
			</CardHeader>
			<CardContent className=" space-y-8 bg-white/60">
				{/* Section 1: Core Settings */}
				<div className="space-y-6">
					<div className="flex items-center gap-2 ">
						<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
						<h3 className="text-sm font-semibold text-blue-700">
							Core Settings
						</h3>
					</div>
					<CategorySelect
						categories={categories}
						category={formData.categoryName}
						subcategory={formData.subcategory}
						onChangeCategory={(v: string) => onChange("categoryName", v)}
						onChangeSubcategory={(v: string) => onChange("subcategory", v)}
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<CommonSelect
							label="Reading Level"
							value={formData.level}
							onChange={(value: string) => onChange("level", value)}
							options={levels.map((level) => ({
								value: level.name,
								label: level.name,
								description: level.description,
								metadata: level.cefr ? { cefr: level.cefr } : undefined,
							}))}
							placeholder="Select reading level"
						/>

						<CommonSelect
							label="Article Format"
							value={formData.format}
							onChange={(value: string) => onChange("format", value)}
							options={articleFormats.map((format) => ({
								value: format.name,
								label: format.name,
								description: format.description,
								metadata: {
									structure: format.structure,
									audience: format.audience,
								},
							}))}
							placeholder="Select article format"
						/>

						<CommonSelect
							label="Words Count"
							value={formData.wordsCountRange}
							onChange={(value: string) => onChange("wordsCountRange", value)}
							options={Object.entries(wordsCountRange).map(([key, range]) => {
								const label = key
									.replace(/([A-Z])/g, " $1")
									.replace(/^\w/, (c) => c.toUpperCase());
								return {
									value: key,
									label,
									metadata: {
										min: range.min,
										max: range.max,
									},
								};
							})}
							placeholder="Select words count"
						/>
					</div>
				</div>

				<div className="border-t border-blue-200/60 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent h-px" />

				{/* Section 2: Content Details */}
				<div className="space-y-6">
					<div className="flex items-center gap-2">
						<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
						<h3 className="text-sm font-semibold text-blue-700">
							Content Details (Optional)
						</h3>
					</div>
					<div className="bg-white/80 p-4 rounded-xl border border-blue-100/60 shadow-sm">
						<Label htmlFor={topicId} className="text-blue-800 font-medium">
							Article Topic
						</Label>
						<div className="relative mt-2">
							<BookText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
							<Input
								id={topicId}
								placeholder="e.g. Iphone color popularity"
								value={formData.topic}
								onChange={(e) => onChange("topic", e.target.value)}
								className="pl-9 border-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20 bg-white/95"
							/>
						</div>
						<p className="mt-2 text-xs text-blue-600/70">
							A clear topic helps the AI produce focused, relevant content.
						</p>
					</div>
					<div className="bg-white/95 p-4 rounded-xl border border-blue-100/60 shadow-md">
						<Label htmlFor={keywordsId} className="text-blue-800 font-medium">
							Your Keywords
						</Label>
						<div className="relative mt-2">
							<Tags className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
							<Input
								id={keywordsId}
								placeholder="apple, performance, examination, lithium"
								value={formData.offeredWords}
								onChange={(e) => onChange("offeredWords", e.target.value)}
								className="pl-9 border-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20 bg-white/95"
							/>
						</div>
						<p className="mt-2 text-xs text-blue-600/70">
							Separate keywords with commas. These guide the article's
							direction.
						</p>
					</div>
				</div>

		{/*		<div className="border-t border-blue-200/60 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent h-px" />

				 Section 3: Fine-Tuning
				<div className="space-y-6">
					<div className="flex items-center gap-2">
						<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
						<h3 className="text-sm font-semibold text-blue-700">
							Fine-Tuning (Optional)
						</h3>
					</div>
					<div className="bg-white/95 p-4 rounded-xl border border-blue-100/60 shadow-md">
						<Label htmlFor={notesId} className="text-blue-800 font-medium">
							Additional Notes
						</Label>
						<div className="relative mt-2">
							<PenSquare className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
							<Textarea
								id={notesId}
								placeholder="Tone, length, audience, references, style…"
								value={formData.additionalNotes}
								onChange={(e) => onChange("additionalNotes", e.target.value)}
								rows={3}
								className="pl-9 border-blue-200/60 focus:border-blue-400 focus:ring-blue-400/20 bg-white/95 resize-none"
							/>
						</div>
						<p className="mt-2 text-xs text-blue-600/70">
							Add any constraints or context you'd like the model to follow.
						</p>
					</div>
				</div>*/}

				<div className="pt-4">
					<Button
						onClick={onGenerate}
						disabled={
							!formData.categoryName ||
							!formData.level ||
							!formData.format ||
							!formData.wordsCountRange ||
							isGenerating
						}
						className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-xl border border-blue-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
						size="lg"
					>
						{isGenerating ? (
							<>
								<Sparkles className="w-5 h-5 mr-3 animate-spin text-white" />
								<span className="font-semibold">Generating...</span>
							</>
						) : (
							<>
								<Sparkles className="w-5 h-5 mr-3 text-white" />
								<span className="font-semibold">Generate Article</span>
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
