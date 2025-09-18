import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "~/components/ui/dropdown-menu";
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
    <div>
      <Label>Category</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {category ? `${category}${subcategory ? ` / ${subcategory}` : ""}` : "Select a category"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {categories.map((cat) => (
            <DropdownMenuSub key={cat.name}>
              <DropdownMenuSubTrigger>
                <span className="flex-1 text-left">
                  {cat.name}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
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
