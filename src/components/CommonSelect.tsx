import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import { levels } from "~/lib/db/local-data/levels";

export interface SelectOption {
	value: string;
	label: string;
	description?: string;
	metadata?: Record<string, unknown>;
}

interface CommonSelectProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
}

export function CommonSelect({
	label,
	value,
	onChange,
	options,
	placeholder = "Select an option",
}: CommonSelectProps) {
	const [isOpen, setIsOpen] = useState(false);

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div className={"flex flex-col gap-2"}>
			<Label>
				{label}
				<span className="text-red-500">*</span>
			</Label>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="w-full justify-between">
						{selectedOption ? selectedOption.label : placeholder}
						<ChevronDown className="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64">
					{options.map((option) => (
						<DropdownMenuItem
							key={option.value}
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
							className="flex flex-col items-start p-3"
						>
							<span className="font-medium">{option.label}</span>
							{option.description && (
								<span className="text-xs text-muted-foreground mt-1">
									{option.description}
								</span>
							)}
							{option.metadata && Object.keys(option.metadata).length > 0 && (
								<div className="text-xs text-muted-foreground mt-1">
									{Object.entries(option.metadata).map(([key, value]) => (
										<div key={key}>
											{key}: {String(value)}
										</div>
									))}
								</div>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
