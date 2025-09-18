import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BookOpen,
	Sparkles,
	Target,
	Users,
	Zap,
} from "lucide-react";

import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-sky-50/50">
				<div className="absolute inset-0 opacity-40">
					<div
						className="w-full h-full"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					/>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
					<div className="text-center">
						<div className="flex justify-center mb-8">
							<div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
								<Sparkles className="w-4 h-4 mr-2" />
								Powered by Advanced AI
							</div>
						</div>
						<h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
							AI-Powered Articles
							<span className="block text-blue-600">From Your Words</span>
						</h1>
						<p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
							Our advanced AI transforms your keywords and ideas into
							professional, engaging articles. Simply provide your words, and
							watch intelligent technology create perfect content.
						</p>
						<div className=" sm:flex-row gap-4">
							<Button
								size="lg"
								className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
							>
								<Link to={"/article-generator"}>Generate AI Article</Link>

								<ArrowRight className="ml-2 w-5 h-5" />
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20">
						<h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							Powerful Features for Perfect Articles
						</h2>

						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							Customize every aspect of your content generation with our
							advanced AI tools
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
								<Target className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">
								Choose Categories
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Select from 10+ categories including Technology, Business,
								Health, and more
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
								<Zap className="w-8 h-8 text-sky-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">
								Difficulty Levels
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Adjust complexity from Beginner to Expert to match your audience
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
								<BookOpen className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">
								Custom Topics
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Specify exactly what you want to write about with custom topic
								input
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
								<Users className="w-8 h-8 text-sky-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">
								Keyword Integration
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Include specific words and phrases to optimize your content
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-slate-900 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-6">
							<Sparkles className="w-8 h-8 text-blue-400 mr-3" />
							<span className="text-2xl font-bold">AI Article Generator</span>
						</div>
						<p className="text-slate-400 mb-8 max-w-2xl mx-auto">
							Empowering content creators with intelligent article generation
							technology.
						</p>
						<div className="border-t border-slate-800 pt-8">
							<p className="text-slate-500">
								© 2024 AI Article Generator. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
