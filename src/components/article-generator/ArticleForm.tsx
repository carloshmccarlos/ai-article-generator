import { Sparkles } from "lucide-react";
import { useId } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { articleFormats } from "~/lib/db/local-data/article-formats";
import { categories } from "~/lib/db/local-data/categories";
import { levels } from "~/lib/db/local-data/levels";
import { CategorySelect } from "./CategorySelect";
import { LevelSelect } from "./LevelSelect";
import type { FormData } from "./types";

export function ArticleForm({
	formData,
	onChange,
	onGenerate,
	isGenerating,
}: {
	formData: FormData;
	onChange: (field: keyof FormData, value: string) => void;
	onGenerate: () => void;
	isGenerating: boolean;
}) {
	const topicId = useId();
	const keywordsId = useId();
	const notesId = useId();

	// Category selection is handled within CategorySelect component

	return (
		<Card className="h-fit">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					Article Configuration
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Category */}
				<CategorySelect
					categories={categories}
					category={formData.category}
					subcategory={formData.subcategory}
					onChangeCategory={(v: string) => onChange("category", v)}
					onChangeSubcategory={(v: string) => onChange("subcategory", v)}
				/>

				{/* Subcategory handled within CategorySelect via submenu */}

				{/* Level */}
				<LevelSelect
					levels={levels}
					value={formData.level}
					onChange={(v) => onChange("level", v)}
				/>

				{/* Format */}
				<div>
					<Label htmlFor="format">Article Format</Label>
					<Select
						value={formData.format}
						onValueChange={(v) => onChange("format", v)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select article format" />
						</SelectTrigger>
						<SelectContent>
							{articleFormats.map((format) => (
								<SelectItem key={format.name} value={format.name}>
									{format.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Topic */}
				<div>
					<Label htmlFor={topicId}>Article Topic</Label>
					<Input
						id={topicId}
						placeholder="Enter your article topic"
						value={formData.topic}
						onChange={(e) => onChange("topic", e.target.value)}
					/>
				</div>

				{/* Keywords */}
				<div>
					<Label htmlFor={keywordsId}>Your Keywords</Label>
					<Input
						id={keywordsId}
						placeholder="Enter keywords separated by commas"
						value={formData.keywords}
						onChange={(e) => onChange("keywords", e.target.value)}
					/>
				</div>

				{/* Notes */}
				<div>
					<Label htmlFor={notesId}>Additional Notes</Label>
					<Textarea
						id={notesId}
						placeholder="Any specific requirements or style preferences"
						value={formData.additionalNotes}
						onChange={(e) => onChange("additionalNotes", e.target.value)}
						rows={3}
					/>
				</div>

				{/* Generate */}
				<Button
					onClick={onGenerate}
					disabled={!formData.topic || !formData.keywords || isGenerating}
					className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
					size="lg"
				>
					{isGenerating ? (
						<>
							<Sparkles className="w-4 h-4 mr-2 animate-spin" /> Generating...
						</>
					) : (
						<>
							<Sparkles className="w-4 h-4 mr-2" /> Generate Article
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
