import { FilePathState } from "@/state";
import { useRecoilState } from "recoil";

export const useEditorImpl = () => {
	const [filePath, setFilePath] = useRecoilState(FilePathState);

	return { filePath, setFilePath };
};
