import { FilePathState, NoteListState } from "@/state";
import { File } from "@/types";
import { invoke } from "@tauri-apps/api";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export const useNoteData = () => {
	const [filePath, setFilePath] = useRecoilState(FilePathState);
	const [noteList, setNoteList] = useRecoilState(NoteListState);

	const handleCreateFile = async () => {
		const filename = crypto.randomUUID();
		await invoke("create_file", { filename: filename });

		getNoteList();
		toast.success(`Created file with name ${filename}`);
	};

	const handleDeletefile = async () => {
		try {
			await invoke("delete_note", { filepath: filePath ?? "" });
			toast.success("File deleted successfully");
		} catch (err) {
			toast.error(String(err));
		}

		getNoteList();
	};

	const getNoteList = async () => {
		const list = (await invoke("get_file_list", {})) as File[];
		setNoteList([...list]);
		if (list.length > 0) {
			setFilePath(list[0].route);
		} else {
			setFilePath(null);
		}
	};

	useEffect(() => {
		getNoteList();
	}, []);

	return {
		noteList,
		filePath,
		getNoteList,
		setFilePath,
		handleCreateFile,
		handleDeletefile,
	};
};
