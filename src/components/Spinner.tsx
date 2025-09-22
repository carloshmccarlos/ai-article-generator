export default function Spinner() {
	return (
		<div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center">
			<output className="flex flex-col items-center" aria-live="polite">
				<svg
					className="animate-spin h-12 w-12 text-blue-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<title>Generating</title>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					/>
				</svg>
				<p className="mt-4 text-slate-700">Generating your article...</p>
			</output>
		</div>
	);
}
