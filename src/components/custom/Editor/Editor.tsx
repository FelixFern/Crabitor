import { Input } from "@/components/ui/input";
import { formatDate } from "@/util/format";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editor.css";
import { Breadcrumb } from "./components";
import { useEditorImpl } from "./useEditorImpl";

const extensions = [
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: true,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: true,
		},
	}),
];

const Editor = () => {
	const editor = useEditor({
		extensions: extensions,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			handleUpdateNote(html);
		},
	});

	const {
		filePath,
		filename,
		lastUpdated,
		setFileName,
		handleRenameFile,
		handleUpdateNote,
	} = useEditorImpl({ editor: editor });

	if (!filePath) {
		return;
	}

	return (
		<div className="flex flex-col w-full h-screen p-10">
			<div className="flex items-center justify-between">
				<Input
					type="text"
					className="flex-grow px-0 py-4 text-2xl font-bold text-orange-500 border-none shadow-none outline-none"
					value={filename}
					onChange={(e) => setFileName(e.target.value)}
					onBlur={handleRenameFile}
				/>
				<span className="flex-grow w-full text-sm text-right dark:text-slate-300 text-slate-400 ">
					<b>Last Updated: </b>
					{formatDate(lastUpdated)}
				</span>
			</div>
			<Breadcrumb filePath={filePath ?? ""} />
			<div className="flex-grow py-4">
				<EditorContent editor={editor} className="h-full" />
			</div>
		</div>
	);
};

export default Editor;
