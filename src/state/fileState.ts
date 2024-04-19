import { atom } from "recoil";

export const FilePathState = atom({
	default: null as string | null,
	key: "FilePath",
});
