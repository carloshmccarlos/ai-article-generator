import { Link } from "@tanstack/react-router";
import { Wand2 } from "lucide-react";

export default function TitlePart() {
	return (
		<div className="text-center mb-8">
			<Link to={"/"} className="text-4xl font-bold text-slate-900 mb-4">
				<Wand2 className="inline-block w-10 h-10 mr-3 text-blue-600" />
				AI Article Generator
			</Link>
			<p className="text-xl text-slate-600">
				Create professional articles with your keywords and preferences
			</p>
		</div>
	);
}
