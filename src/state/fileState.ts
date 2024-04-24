import { File } from "@/types";
import { atom } from "recoil";

export const FilePathState = atom({
	default: null as string | null,
	key: "FilePath",
});

export const NoteListState = atom({
	default: [] as File[],
	key: "NoteList",
});
