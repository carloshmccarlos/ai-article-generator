import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function ArticlePreview({
	content,
	title,
	wordCount,
}: {
	content: string;
	title?: string;
	wordCount?: number;
}) {
	const components: Components = {
		code({ node, className, children, ...props }) {
			// Temporarily disable syntax highlighting
			return (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
	};

	return (
		<Card className="rounded-none h-fit">
			<CardHeader>
				<CardTitle>
					{title || "Generated Article"}
					{wordCount && (
						<span className="text-sm font-normal text-muted-foreground ml-2">
							({wordCount} words)
						</span>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{content ? (
					<div className="space-y-6 prose prose-slate max-w-none dark:prose-invert">
						<ReactMarkdown components={components}>{content}</ReactMarkdown>
					</div>
				) : (
					<div className="text-center py-12 text-slate-500">
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
