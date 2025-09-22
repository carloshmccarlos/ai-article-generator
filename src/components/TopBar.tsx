import { useState } from "react";
import { ArticlePreview } from "~/components/ArticlePreview";
import { Button } from "~/components/ui/button";

function TopBar({
	setGeneratedArticle,
	generatedArticle,
}: {
	generatedArticle: string;
	setGeneratedArticle: (article: string) => void;
}) {
	const [copied, setCopied] = useState(false);
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

	return (
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
						Back to Configuration
					</Button>
				</div>
			</div>
		</div>
	);
}

export default TopBar;
