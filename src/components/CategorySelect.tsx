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
	const selectedCategory = categories.find(cat => cat.name === category);

	return (
		<div className={"flex flex-col gap-3"}>
			{/* Category Selection */}
			<div className="flex flex-col gap-2">
				<Label>
					Category<span className="text-red-500">*</span>
				</Label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="w-full justify-between">
							{category || "Select a category"}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-full max-w-[280px] max-h-[300px] overflow-y-auto">
						{categories.map((cat) => (
							<DropdownMenuItem
								key={cat.name}
								onClick={() => {
									onChangeCategory(cat.name);
									onChangeSubcategory(""); // Reset subcategory when category changes
								}}
								className={category === cat.name ? "bg-accent" : ""}
							>
								{cat.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Subcategory Selection - Only show if category is selected */}
			{selectedCategory && selectedCategory.subcategories.length > 0 && (
				<div className="flex flex-col gap-2">
					<Label>
						Subcategory <span className="text-sm text-muted-foreground">(Optional)</span>
					</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="w-full justify-between">
								{subcategory || "All subcategories"}
								<ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full max-w-[280px] max-h-[200px] overflow-y-auto">
							<DropdownMenuItem
								onClick={() => onChangeSubcategory("")}
								className={!subcategory ? "bg-accent" : ""}
							>
								All subcategories
							</DropdownMenuItem>
							{selectedCategory.subcategories.map((sub) => (
								<DropdownMenuItem
									key={sub}
									onClick={() => onChangeSubcategory(sub)}
									className={subcategory === sub ? "bg-accent" : ""}
								>
									{sub}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</div>
	);
}
