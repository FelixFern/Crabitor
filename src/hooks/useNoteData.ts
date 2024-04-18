import { File } from "@/types";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

export const useNoteData = () => {
	const [noteList, setNoteList] = useState<File[]>([]);

	const getNoteList = async () => {
		const list = (await invoke("get_file_list", {})) as File[];
		console.log("test");
		// setNoteList([...list]);
	};

	useEffect(() => {
		getNoteList();
		console.log("test");
	}, []);

	return {
		noteList,
		getNoteList,
	};
};
