import { createServerFn } from "@tanstack/react-start";
import { ArticleGenerateSchema } from "~/validation/articleSchema";

export const generateArticle = createServerFn()
	.validator(ArticleGenerateSchema)
	.handler(async ({ data }) => {
		console.log(data);

		return { result: "success" };
	});
