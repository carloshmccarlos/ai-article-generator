import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function ArticlePreview({ content }: { content: string }) {
	return (
		<Card className="h-fit">
			<CardHeader>
				<CardTitle>Generated Article</CardTitle>
			</CardHeader>
			<CardContent>
				{content ? (
					<div className="prose prose-slate max-w-none">
						<div className="whitespace-pre-wrap font-mono text-sm bg-slate-50 p-4 rounded-lg border">
							{content}
						</div>
					</div>
				) : (
					<div className="text-center py-12 text-slate-500">
						<FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
						<p>Your generated article will appear here</p>
						<p className="text-sm mt-2">
							Fill in the form and click "Generate Article"
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
