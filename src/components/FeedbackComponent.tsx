import { useState } from "react";
import { AdviceForm } from "~/components/AdviceForm";
import { Button } from "~/components/ui/button";
import {  recordFeedback } from "~/serverFn/feedbackServerFn";

import type { ArticleFormData } from "~/validation/articleSchema";
import {createArticle} from "~/serverFn/articleServerFn";

interface FeedbackComponentProps {
	article: string;
	title: string;
	formData: ArticleFormData;
}

export function FeedbackComponent({
	article,
	title,
	formData,
}: FeedbackComponentProps) {
	const [hasResponded, setHasResponded] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [showAdviceForm, setShowAdviceForm] = useState(false);

	const handleSatisfied = async () => {
		setIsSaving(true);
		try {
			// Record feedback first
			await recordFeedback({
				data: {
					feedbackType: "satisfied",
					articleTitle: title,
				},
			});

			// Save the article
			const result = await createArticle({
				data: {
					...formData,
					content: article,
					title: title,
				},
			});

			if (result.success) {
				setIsSaving(false);
				setHasResponded(true);
			} else {
				console.error("Failed to save article:", result.error);
				setIsSaving(false);
				// Still show success since feedback was recorded
				setHasResponded(true);
			}
		} catch (error) {
			console.error("Error in handleSatisfied:", error);
			setIsSaving(false);
			setHasResponded(true);
		}
	};

	const handleNotSatisfied = async () => {
		// Record feedback first
		await recordFeedback({
			data: {
				feedbackType: "not_satisfied",
				articleTitle: title,
			},
		});

		setShowAdviceForm(true);
	};

	const handleAdviceSubmitted = () => {
		setHasResponded(true);
	};

	if (hasResponded) {
		return <p className="text-center text-green-600">Thank you!</p>;
	}

	if (showAdviceForm) {
		return <AdviceForm onSubmit={handleAdviceSubmitted} />;
	}

	return (
		<div className="text-center space-y-4">
			<p>Are you satisfied with this article?</p>

			<p className="text-xs text-slate-500">
				Click &quot;Yes&quot; to save your article to the database for later
				sharing.
			</p>

			<div className="flex gap-3 justify-center">
				<Button
					onClick={handleSatisfied}
					disabled={isSaving}
					className="bg-green-600 hover:bg-green-700"
				>
					{isSaving ? "Saving..." : "Yes"}
				</Button>

				<Button onClick={handleNotSatisfied} variant="outline">
					No
				</Button>
			</div>
		</div>
	);
}
