import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { File } from "@/types";
import { File as FileIcon } from "lucide-react";

const files: File[] = [
	{
		id: "1",
		file_name: "Testing",
	},
	{
		id: "1",
		file_name: "Testing",
	},
	{
		id: "1",
		file_name: "Testing",
	},
	{
		id: "1",
		file_name: "Testing",
	},
];

const FileList = () => {
	return (
		<div className="flex flex-col gap-2">
			{files.map((val, index) => {
				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipContent side="left">
								{val.file_name}
							</TooltipContent>
							<TooltipTrigger>
								<div className="relative p-2 border-[1px] dark:border-slate-700 border-slate-400 rounded-md cursor-pointer hover:opacity-60 transition-opacity">
									<FileIcon width={14} height={14} />
									<div className="absolute w-2 h-2 flex items-center justify-center right-[-8px] text-sm bottom-[-8px] p-2 dark:bg-slate-950 bg-white">
										{index + 1}
									</div>
								</div>
							</TooltipTrigger>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
};

export default FileList;
