import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import FileList from "./components/FileList";
import { ModeToggle } from "./components/ModeToggle";

const Sidebar = () => {
	return (
		<div className="justify-between h-[98vh] w-16 border-r-[1px] dark:border-slate-700 border-slate-200 flex flex-col items-center p-2 ">
			<div className="flex flex-col gap-4 items-center">
				<Book />
				<Separator />
				<FileList />
			</div>
			<div className="flex flex-col gap-4 items-center">
				<Separator />
				<ModeToggle />
			</div>
		</div>
	);
};

export default Sidebar;
