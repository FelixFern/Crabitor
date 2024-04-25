import { FilePathState, NoteListState } from "@/state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const KeyPressListener = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const setFilePath = useSetRecoilState(FilePathState);
	const noteList = useRecoilValue(NoteListState);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (
				(event.metaKey || event.ctrlKey) &&
				event.key >= "1" &&
				event.key <= "9"
			) {
				const number = parseInt(event.key, 10);

				if (number <= noteList.length) {
					setFilePath(noteList[number - 1].route);
				}
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [noteList]);

	return <>{children}</>;
};
