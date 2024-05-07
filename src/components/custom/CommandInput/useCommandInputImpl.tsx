import { useNoteData } from "@/hooks";
import { CommandInputState } from "@/state/commandInputState";
import { DoorClosedIcon, File, Palette, Trash2 } from "lucide-react";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useRecoilState } from "recoil";
import { useTheme } from "../ThemeProvider";

export type TCommandItem = {
	name: string;
	icon: React.ReactNode;
	action: () => void;
};

export const useCommandInputImpl = () => {
	const [commandSearch, setCommandSearch] = useState("");

	const { handleCreateFile, handleDeletefile } = useNoteData();
	const { theme, setTheme } = useTheme();

	const [commandInput, setCommandInput] = useRecoilState(CommandInputState);
	const commandInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		commandInputRef.current?.focus();
		if (!commandInput) {
			setCommandSearch("");
		}
	}, [commandInput]);

	const handleToggleTheme = useCallback(() => {
		console.log(theme);
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}, [theme]);

	const commandList = useMemo(
		() =>
			[
				{
					name: "Close App",
					icon: <DoorClosedIcon size={16} />,
				},
				{
					name: "Delete File",
					icon: <Trash2 size={16} />,
					action: () => handleDeletefile(),
				},
				{
					name: "New File",
					icon: <File size={16} />,
					action: () => handleCreateFile(),
				},
				{
					name: "Toggle Theme",
					icon: <Palette size={16} />,
					action: () => handleToggleTheme(),
				},
			] as TCommandItem[],
		[]
	);

	const filteredCommand = useMemo(() => {
		return commandList.filter((val) =>
			val.name.toLowerCase().includes(commandSearch.toLowerCase())
		);
	}, [commandSearch]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (
				event.key === "Enter" &&
				filteredCommand.length > 0 &&
				commandInput
			) {
				filteredCommand[0].action();
				setCommandInput(false);
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [commandSearch]);

	return {
		commandInput,
		commandInputRef,
		commandSearch,
		setCommandSearch,
		commandList,
		filteredCommand,
	};
};
