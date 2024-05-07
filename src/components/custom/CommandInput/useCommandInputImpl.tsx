import { CommandInputState } from "@/state/commandInputState";
import { DoorClosedIcon, Palette, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

export type TCommandItem = {
	name: string;
	icon: React.ReactNode;
	action: () => void;
};

export const useCommandInputImpl = () => {
	const [commandSearch, setCommandSearch] = useState("");
	const commandInput = useRecoilValue(CommandInputState);
	const commandInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		commandInputRef.current?.focus();
		if (!commandInput) {
			setCommandSearch("");
		}
	}, [commandInput]);

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
					action: () => {},
				},
				{
					name: "Toggle Theme",
					icon: <Palette size={16} />,
					action: () => {},
				},
			] as TCommandItem[],
		[]
	);

	const filteredCommand = useMemo(() => {
		return commandList.filter((val) =>
			val.name.toLowerCase().includes(commandSearch.toLowerCase())
		);
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
