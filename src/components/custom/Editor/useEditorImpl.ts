import { useNoteData } from "@/hooks";
import { Note } from "@/types";
import { getFileName } from "@/util/format";
import { invoke } from "@tauri-apps/api";
import { Editor } from "@tiptap/react";
import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export const useEditorImpl = ({ editor }: { editor: Editor | null }) => {
	const { filePath, setFilePath, getNoteList } = useNoteData();
	const [filename, setFileName] = useState(getFileName(filePath ?? ""));
	const [lastUpdated, setLastUpdate] = useState("");

	useEffect(() => {
		setFileName(getFileName(filePath ?? ""));
		getNoteContent();
	}, [filePath]);

	const getNoteContent = async () => {
		const note = (await invoke("read_note", {
			filepath: filePath,
		})) as Note;

		setLastUpdate(note.last_updated);

		if (editor) {
			editor.commands.setContent(note.note);
		}
	};

	const handleUpdateNote = async (html: string) => {
		await invoke("update_note", {
			note: html,
			filepath: filePath,
		});
		setLastUpdate(moment(new Date()).format("YYYY-MM-DD HH:MM:ss +07:00"));
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
			toast.success(rename as string);

			setFilePath(new_route);
		} catch (err) {
			setFileName(getFileName(filePath ?? ""));
			toast.error(err as string);
		}
		getNoteList();
	};

	return {
		filePath,
		setFilePath,
		filename,
		lastUpdated,
		setFileName,
		handleRenameFile,
		handleUpdateNote,
	};
};
