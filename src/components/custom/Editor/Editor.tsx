import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "./components";
import { useEditorImpl } from "./useEditorImpl";

const Editor = () => {
	const {
		filePath,
		noteContent,
		filename,
		setFileName,
		handleRenameFile,
		handleUpdateNote,
	} = useEditorImpl();

	return (
		<div className="flex flex-col w-full h-screen p-10">
			<div className="flex items-center justify-between">
				<Input
					type="text"
					className="flex-grow px-0 py-4 text-2xl font-bold border-none shadow-none outline-none"
					value={filename}
					onChange={(e) => setFileName(e.target.value)}
					onBlur={handleRenameFile}
				/>
			</div>
			<Breadcrumb filePath={filePath ?? ""} />
			<div className="flex-grow py-4">
				<Textarea
					className="w-full h-full  rounded-md outline-none focus-visible:border-slate-700 border-[1px] border-transparent p-4 shadow-none"
					value={noteContent?.note}
					onChange={handleUpdateNote}
				/>
			</div>
		</div>
	);
};

export default Editor;
