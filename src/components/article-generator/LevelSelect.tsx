import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import type { Level } from "~/lib/db/local-data/levels";

export function LevelSelect({
	levels,
	value,
	onChange,
}: {
	levels: Level[];
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div>
			<Label htmlFor="level">Difficulty Level</Label>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select difficulty level" />
				</SelectTrigger>
				<SelectContent>
					{levels.map((level) => (
						<SelectItem key={level.name} value={level.name}>
							{level.name} {level.cefr && `(${level.cefr})`}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
