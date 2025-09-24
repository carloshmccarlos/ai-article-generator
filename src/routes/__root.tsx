/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import appCss from "~/styles.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "AI Article Generator - Create Professional Content with AI",
			},
			{
				name: "description",
				content:
					"Generate professional, engaging articles using advanced AI technology. Simply provide your keywords and watch as our intelligent system creates perfect content tailored to your needs.",
			},
			{
				name: "keywords",
				content:
					"AI article generator, content creation, artificial intelligence writing, automated content, blog writing, SEO content, article writing tool, AI writer",
			},
			{
				name: "author",
				content: "AI Article Generator",
			},
			{
				name: "robots",
				content: "index, follow",
			},
			// Open Graph / Facebook
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:title",
				content: "AI Article Generator - Create Professional Content with AI",
			},
			{
				property: "og:description",
				content:
					"Generate professional, engaging articles using advanced AI technology. Simply provide your keywords and watch as our intelligent system creates perfect content tailored to your needs.",
			},
			{
				property: "og:image",
				content: "/og-image.png",
			},
			{
				property: "og:url",
				content: "https://ai-article-generator.com",
			},
			{
				property: "og:site_name",
				content: "AI Article Generator",
			},
			// Twitter
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "AI Article Generator - Create Professional Content with AI",
			},
			{
				name: "twitter:description",
				content:
					"Generate professional, engaging articles using advanced AI technology. Simply provide your keywords and watch as our intelligent system creates perfect content tailored to your needs.",
			},
			{
				name: "twitter:image",
				content: "/og-image.png",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "canonical", href: "https://ai-article-generator.com" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					{children}
					<Toaster richColors />
				</ThemeProvider>



				<Scripts />
			</body>
		</html>
	);
}
