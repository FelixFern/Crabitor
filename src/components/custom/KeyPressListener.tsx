import { FilePathState, NoteListState } from "@/state";
import { CommandInputState } from "@/state/commandInputState";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const KeyPressListener = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const setFilePath = useSetRecoilState(FilePathState);
	const noteList = useRecoilValue(NoteListState);
	const [_, setCommandInput] = useRecoilState(CommandInputState);

	const keyPresses = (event: KeyboardEvent) => {
		return [
			{
				key:
					(event.metaKey || event.ctrlKey) &&
					event.key >= "1" &&
					event.key <= "9",
				action: () => {
					const number = parseInt(event.key, 10);

					if (number <= noteList.length) {
						setFilePath(noteList[number - 1].route);
					}
				},
			},
			{
				key: event.shiftKey && event.key === "k",
				action: () => {
					setCommandInput((val) => !val);
				},
			},
			{
				key: event.key === "Escape",
				action: () => {
					setCommandInput(false);
				},
			},
		];
	};

	const handleKeyPress = (event: KeyboardEvent) => {
		keyPresses(event).forEach((press) => {
			if (press.key) {
				press.action();
			}
		});
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [noteList]);

	return <>{children}</>;
};
