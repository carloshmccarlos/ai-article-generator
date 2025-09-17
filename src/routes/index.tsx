import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronDown, Sparkles, Star, Target, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/")({
	component: Home,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function Home() {
	const [selectedCategory, setSelectedCategory] = useState("Technology");
	const [selectedDifficulty, setSelectedDifficulty] = useState("Intermediate");
	const [topic, setTopic] = useState("");
	const [keywords, setKeywords] = useState("");

	const categories = [
		"Technology", "Business", "Health", "Science", "Education", 
		"Lifestyle", "Travel", "Food", "Sports", "Entertainment"
	];

	const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-sky-50/50">
				<div className="absolute inset-0 opacity-40">
					<div className="w-full h-full" style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
					}}></div>
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
							Generate Amazing
							<span className="block text-blue-600">Articles Instantly</span>
						</h1>
						<p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
							Create high-quality, engaging articles with our AI-powered generator. 
							Choose your category, set difficulty level, and watch as perfect content comes to life.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
								Start Generating
								<ArrowRight className="ml-2 w-5 h-5" />
							</Button>
							<Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg">
								Watch Demo
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
							Customize every aspect of your content generation with our advanced AI tools
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
								<Target className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">Choose Categories</h3>
							<p className="text-slate-600 leading-relaxed">
								Select from 10+ categories including Technology, Business, Health, and more
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
								<Zap className="w-8 h-8 text-sky-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">Difficulty Levels</h3>
							<p className="text-slate-600 leading-relaxed">
								Adjust complexity from Beginner to Expert to match your audience
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
								<BookOpen className="w-8 h-8 text-blue-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Topics</h3>
							<p className="text-slate-600 leading-relaxed">
								Specify exactly what you want to write about with custom topic input
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
								<Users className="w-8 h-8 text-sky-600" />
							</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-4">Keyword Integration</h3>
							<p className="text-slate-600 leading-relaxed">
								Include specific words and phrases to optimize your content
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Demo Section */}
			<section className="py-24 bg-slate-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							Try It Yourself
						</h2>
						<p className="text-xl text-slate-600">
							Customize your article generation settings below
						</p>
					</div>

					<div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
						<div className="grid md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div>
									<Label htmlFor="category" className="text-base font-semibold text-slate-900 mb-3 block">
										Category
									</Label>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" className="w-full justify-between text-left font-normal">
												{selectedCategory}
												<ChevronDown className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-full">
											{categories.map((category) => (
												<DropdownMenuItem
													key={category}
													onClick={() => setSelectedCategory(category)}
												>
													{category}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								<div>
									<Label htmlFor="difficulty" className="text-base font-semibold text-slate-900 mb-3 block">
										Difficulty Level
									</Label>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" className="w-full justify-between text-left font-normal">
												{selectedDifficulty}
												<ChevronDown className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-full">
											{difficulties.map((difficulty) => (
												<DropdownMenuItem
													key={difficulty}
													onClick={() => setSelectedDifficulty(difficulty)}
												>
													{difficulty}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<Label htmlFor="topic" className="text-base font-semibold text-slate-900 mb-3 block">
										Specific Topic
									</Label>
									<Input

										placeholder="e.g., Machine Learning in Healthcare"
										value={topic}
										onChange={(e) => setTopic(e.target.value)}
										className="text-base py-3"
									/>
								</div>

								<div>
									<Label htmlFor="keywords" className="text-base font-semibold text-slate-900 mb-3 block">
										Keywords to Include
									</Label>
									<Input

										placeholder="e.g., AI, innovation, future, automation"
										value={keywords}
										onChange={(e) => setKeywords(e.target.value)}
										className="text-base py-3"
									/>
								</div>
							</div>
						</div>

						<div className="mt-10 text-center">
							<Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
								<Sparkles className="mr-2 w-5 h-5" />
								Generate Article
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Social Proof Section */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
							Trusted by Content Creators
						</h2>
						<p className="text-xl text-slate-600">
							Join thousands of writers who create amazing content daily
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200">
								<div className="flex items-center mb-4">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
									))}
								</div>
								<p className="text-slate-700 mb-6 leading-relaxed">
									"This AI article generator has completely transformed my content creation process. 
									The quality is exceptional and it saves me hours every week."
								</p>
								<div className="flex items-center">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
										<span className="text-blue-600 font-semibold">JD</span>
									</div>
									<div>
										<p className="font-semibold text-slate-900">John Doe</p>
										<p className="text-slate-600 text-sm">Content Creator</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 bg-gradient-to-r from-blue-600 to-sky-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Ready to Create Amazing Content?
					</h2>
					<p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
						Start generating high-quality articles in seconds. No credit card required.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
							Get Started Free
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>
						<Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg">
							Learn More
						</Button>
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
							Empowering content creators with intelligent article generation technology.
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
