import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNoteData } from "@/hooks";
import { getFileName } from "@/util/format";
import classnames from "classnames";
import { File as FileIcon, Plus } from "lucide-react";
import styles from "./FileList.module.css";

const FileList = () => {
	const { noteList, handleCreateFile } = useNoteData();

	return (
		<TooltipProvider>
			<div className="flex flex-col items-center gap-4">
				<Tooltip>
					<TooltipContent side="left">New File</TooltipContent>
					<TooltipTrigger>
						<div
							className="p-2 border-[1px] dark:border-slate-700 border-slate-200 rounded-md hover:opacity-40 cursor-pointer"
							onClick={handleCreateFile}
						>
							<Plus width={14} height={14} />
						</div>
					</TooltipTrigger>
				</Tooltip>
				<Separator />
				<div
					className={classnames(
						styles.fileList,
						"flex flex-col flex-grow gap-2 px-2 overflow-y-scroll overflow-x-visible w-full"
					)}
				>
					{noteList.map((val, index) => {
						return (
							<Tooltip key={val.route}>
								<TooltipContent side="left">
									{getFileName(val.route)}
								</TooltipContent>
								<TooltipTrigger>
									<div className="relative p-2 border-[1px] dark:border-slate-700 border-slate-200 rounded-md cursor-pointer hover:opacity-60 transition-opacity focus:opacity-40	">
										<FileIcon width={14} height={14} />
										<div className="absolute w-2 h-2 flex items-center justify-center right-[-8px] text-sm bottom-[-8px] p-2 dark:bg-slate-950 bg-white">
											{index + 1}
										</div>
									</div>
								</TooltipTrigger>
							</Tooltip>
						);
					})}
				</div>
			</div>
		</TooltipProvider>
	);
};

export default FileList;
