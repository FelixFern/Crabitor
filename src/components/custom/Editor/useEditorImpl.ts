import { useNoteData } from "@/hooks";
import { Note } from "@/types";
import { getFileName } from "@/util/format";
import { invoke } from "@tauri-apps/api";
import { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export const useEditorImpl = () => {
	const { filePath, setFilePath, getNoteList } = useNoteData();
	const [filename, setFileName] = useState(getFileName(filePath ?? ""));
	const [noteContent, setNoteContent] = useState<Note>();

	useEffect(() => {
		setFileName(getFileName(filePath ?? ""));
		getNoteContent();
	}, [filePath]);

	const getNoteContent = async () => {
		const note = (await invoke("read_note", {
			filepath: filePath,
		})) as Note;

		setNoteContent({ ...note });
	};

	const handleUpdateNote = async (e: any) => {
		await invoke("update_note", {
			note: e.target.value,
			filepath: filePath,
		});

		console.log("test");

		setNoteContent(e.target.value);
	};

	const handleRenameFile = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (filename === getFileName(filePath ?? "")) {
			return;
		}

		const new_route =
			filePath
				?.split("/")
				.map((val, index) =>
					index === filePath.split("/").length - 1 ? filename : val
				)
				.join("/") + ".json";

		try {
			const rename = await invoke("rename_file", {
				prevRoute: filePath ?? "",
				newRoute: new_route,
			});
			toast(rename as string);

			setFilePath(new_route);
		} catch (err) {
			setFileName(getFileName(filePath ?? ""));
			toast(err as string);
		}
		getNoteList();
	};

	return {
		filePath,
		noteContent,
		setFilePath,
		filename,
		setFileName,
		handleRenameFile,
		handleUpdateNote,
	};
};
