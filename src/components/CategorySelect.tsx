import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import type { Category } from "~/lib/db/local-data/categories";

export function CategorySelect({
	categories,
	category,
	subcategory,
	onChangeCategory,
	onChangeSubcategory,
}: {
	categories: Category[];
	category: string;
	subcategory: string;
	onChangeCategory: (value: string) => void;
	onChangeSubcategory: (value: string) => void;
}) {
	return (
		<div className="flex flex-col gap-2">
			<Label>
				Category<span className="text-red-500">*</span>
			</Label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between text-sm sm:text-base max-w-full"
					>
						<span className="truncate flex-1 text-left">
							{category
								? subcategory
									? `${category}/${subcategory}`
									: category
								: "Select category"}
						</span>
						<ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 sm:w-64 max-w-[calc(100vw-2rem)]"
					align="start"
					side="bottom"
				>
					{categories.map((cat) => (
						<DropdownMenuSub key={cat.name}>
							<DropdownMenuSubTrigger className="text-sm">
								<span className="truncate">{cat.name}</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="w-48 sm:w-56 max-w-[calc(100vw-4rem)]">
								<DropdownMenuItem
									className="text-sm"
									onClick={() => {
										onChangeCategory(cat.name);
										onChangeSubcategory("");
									}}
								>
									All subcategories
								</DropdownMenuItem>
								{cat.subcategories.map((sub) => (
									<DropdownMenuItem
										key={sub}
										className="text-sm truncate"
										onClick={() => {
											onChangeCategory(cat.name);
											onChangeSubcategory(sub);
										}}
									>
										{sub}
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
