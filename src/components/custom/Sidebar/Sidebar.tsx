import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import { FileList, ModeToggle } from "./components";

const Sidebar = () => {
	return (
		<div className="justify-between h-[98vh] w-16 border-r-[1px] dark:border-slate-700 border-slate-200 flex flex-col items-center p-4 overflow-hidden">
			<div className="flex flex-col items-center flex-grow gap-4 h-fit">
				<Book />
				<Separator />
				<FileList />
			</div>
			<div className="flex flex-col items-center gap-4">
				<Separator />
				<ModeToggle />
			</div>
		</div>
	);
};

export default Sidebar;
