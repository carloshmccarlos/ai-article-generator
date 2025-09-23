import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { submitAdvice } from "~/serverFn/articleServerFn";

interface AdviceFormProps {
	onSubmit: () => void;
}

export function AdviceForm({ onSubmit }: AdviceFormProps) {
	const [advice, setAdvice] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!advice.trim()) {
			return;
		}

		setIsSubmitting(true);
		try {
			await submitAdvice({
				data: {
					content: advice.trim(),
				},
			});

			onSubmit();
		} catch (error) {
			console.error("Error submitting advice:", error);
			onSubmit(); // Still close the form even if submission fails
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-4">
			<div className="text-center">
				<h3 className="text-lg font-semibold mb-2">
					We're sorry you weren't satisfied with the article
				</h3>
				<p className="text-sm text-slate-600">
					Your feedback helps us improve our AI. Please share what could be better:
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<Textarea
					value={advice}
					onChange={(e) => setAdvice(e.target.value)}
					placeholder="Tell us what could be improved... (e.g., content quality, relevance, writing style, length, etc.)"
					className="min-h-[120px] resize-none"
					disabled={isSubmitting}
				/>

				<div className="flex gap-3 justify-center">
					<Button
						type="submit"
						disabled={!advice.trim() || isSubmitting}
						className="bg-blue-600 hover:bg-blue-700"
					>
						{isSubmitting ? "Submitting..." : "Submit Feedback"}
					</Button>

					<Button
						type="button"
						variant="outline"
						onClick={onSubmit}
						disabled={isSubmitting}
					>
						Skip
					</Button>
				</div>
			</form>

			<div className="text-xs text-slate-500 text-center">
				Your feedback is valuable and helps us improve our AI article generation system.
			</div>
		</div>
	);
}
