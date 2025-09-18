import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronDown, Sparkles, Star, Target, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// Rainbow styles with beautiful color combinations
const rainbowStyles = `
  @keyframes rainbow-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes rainbow-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  
  .rainbow-gradient {
    background: linear-gradient(-45deg, 
      #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, 
      #feca57, #ff9ff3, #54a0ff, #5f27cd
    );
    background-size: 400% 400%;
    animation: rainbow-flow 4s ease infinite;
  }
  
  .rainbow-text {
    background: linear-gradient(-45deg, 
      #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, 
      #feca57, #ff9ff3, #54a0ff, #5f27cd
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbow-flow 4s ease infinite;
  }
  
  .rainbow-border {
    position: relative;
    background: linear-gradient(-45deg, 
      #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, 
      #feca57, #ff9ff3, #54a0ff, #5f27cd
    );
    background-size: 400% 400%;
    animation: rainbow-flow 4s ease infinite;
    padding: 3px;
    border-radius: inherit;
  }
  
  .rainbow-border > * {
    background: white;
    border-radius: inherit;
  }
  
  .rainbow-shadow {
    box-shadow: 
      0 0 20px rgba(255, 107, 107, 0.3),
      0 0 40px rgba(78, 205, 196, 0.2),
      0 0 60px rgba(69, 183, 209, 0.1);
    animation: rainbow-pulse 2s ease-in-out infinite;
  }
  
  .rainbow-card {
    background: linear-gradient(135deg, 
      rgba(255, 107, 107, 0.1), 
      rgba(78, 205, 196, 0.1), 
      rgba(69, 183, 209, 0.1)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('rainbow-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleElement = document.createElement('style');
  styleElement.id = 'rainbow-styles';
  styleElement.textContent = rainbowStyles;
  document.head.appendChild(styleElement);
}

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
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
			{/* Hero Section */}
			<section className="relative overflow-hidden rainbow-gradient">
				<div className="absolute inset-0 opacity-20">
					<div className="w-full h-full" style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
					}}></div>
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
					<div className="text-center">
						<div className="flex justify-center mb-8">
							<div className="rainbow-border inline-flex items-center px-4 py-2 rounded-full text-purple-800 text-sm font-medium rainbow-shadow">
								<div className="flex items-center">
									<Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
									Powered by Advanced AI
								</div>
							</div>
						</div>
						<h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
							Generate Amazing
							<span className="block rainbow-text">Articles Instantly</span>
						</h1>
						<p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
							Create high-quality, engaging articles with our AI-powered generator. 
							Choose your category, set difficulty level, and watch as perfect content comes to life.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 rainbow-shadow">
								Start Generating
								<ArrowRight className="ml-2 w-5 h-5" />
							</Button>
							<Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm">
								Watch Demo
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-24 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20">
						<h2 className="text-4xl lg:text-5xl font-bold rainbow-text mb-6">
							Powerful Features for Perfect Articles
						</h2>
						<p className="text-xl text-purple-700 max-w-3xl mx-auto">
							Customize every aspect of your content generation with our advanced AI tools
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all rainbow-shadow">
								<Target className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-purple-900 mb-4">Choose Categories</h3>
							<p className="text-purple-600 leading-relaxed">
								Select from 10+ categories including Technology, Business, Health, and more
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all rainbow-shadow">
								<Zap className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-purple-900 mb-4">Difficulty Levels</h3>
							<p className="text-purple-600 leading-relaxed">
								Adjust complexity from Beginner to Expert to match your audience
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all rainbow-shadow">
								<BookOpen className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-purple-900 mb-4">Custom Topics</h3>
							<p className="text-purple-600 leading-relaxed">
								Specify exactly what you want to write about with custom topic input
							</p>
						</div>

						<div className="text-center group hover:scale-105 transition-transform duration-200">
							<div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all rainbow-shadow">
								<Users className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-purple-900 mb-4">Keyword Integration</h3>
							<p className="text-purple-600 leading-relaxed">
								Include specific words and phrases to optimize your content
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Demo Section */}
			<section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold rainbow-text mb-6">
							Try It Yourself
						</h2>
						<p className="text-xl text-purple-700">
							Customize your article generation settings below
						</p>
					</div>

					<div className="rainbow-border bg-white rounded-2xl shadow-xl p-8 lg:p-12 rainbow-shadow">
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
							<Button size="lg" className="rainbow-gradient text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 rainbow-shadow">
								<Sparkles className="mr-2 w-5 h-5" />
								Generate Article
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Social Proof Section */}
			<section className="py-24 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold rainbow-text mb-6">
							Trusted by Content Creators
						</h2>
						<p className="text-xl text-purple-700">
							Join thousands of writers who create amazing content daily
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="rainbow-card rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200 rainbow-shadow">
								<div className="flex items-center mb-4">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
									))}
								</div>
								<p className="text-purple-700 mb-6 leading-relaxed">
									"This AI article generator has completely transformed my content creation process. 
									The quality is exceptional and it saves me hours every week."
								</p>
								<div className="flex items-center">
									<div className="w-12 h-12 rainbow-gradient rounded-full flex items-center justify-center mr-4">
										<span className="text-white font-semibold">JD</span>
									</div>
									<div>
										<p className="font-semibold text-purple-900">John Doe</p>
										<p className="text-purple-600 text-sm">Content Creator</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 rainbow-gradient">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Ready to Create Amazing Content?
					</h2>
					<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
						Start generating high-quality articles in seconds. No credit card required.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 rainbow-shadow">
							Get Started Free
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>
						<Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm">
							Learn More
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="flex items-center justify-center mb-6">
							<Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
							<span className="text-2xl font-bold rainbow-text">AI Article Generator</span>
						</div>
						<p className="text-white/80 mb-8 max-w-2xl mx-auto">
							Empowering content creators with intelligent article generation technology.
						</p>
						<div className="border-t border-white/20 pt-8">
							<p className="text-white/60">
								© 2024 AI Article Generator. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
