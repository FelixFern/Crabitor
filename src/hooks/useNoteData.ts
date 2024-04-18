import { File } from "@/types";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useNoteData = () => {
	const [noteList, setNoteList] = useState<File[]>([]);

	const handleCreateFile = async () => {
		const filename = crypto.randomUUID();
		await invoke("create_file", { filename: filename });

		getNoteList();
		toast(`Created file with name ${filename}`);
	};

	const getNoteList = async () => {
		const list = (await invoke("get_file_list", {})) as File[];
		setNoteList([...list]);
	};

	useEffect(() => {
		getNoteList();
	}, []);

	return {
		noteList,
		handleCreateFile,
	};
};
