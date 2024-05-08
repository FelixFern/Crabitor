import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import styles from "./CommandInput.module.css";
import { CommandList } from "./CommandList";
import { useCommandInputImpl } from "./useCommandInputImpl";

const CommandInput = () => {
	const {
		commandInput,
		commandInputRef,
		commandSearch,
		setCommandSearch,
		filteredCommand,
	} = useCommandInputImpl();

	return (
		commandInput && (
			<div className={styles.commandInput}>
				<div
					className={cn([
						styles.commandInputDialog,
						"shadow-md bg-slate-100 dark:bg-zinc-900",
					])}
				>
					<div className={styles.inputContainer}>
						<SearchIcon height={16} />
						<Input
							placeholder="Input your command here"
							className="border-none shadow-none"
							ref={commandInputRef}
							value={commandSearch}
							onChange={(e) => {
								setCommandSearch(e.target.value);
							}}
						/>
					</div>
					<CommandList commandList={filteredCommand} />
				</div>
			</div>
		)
	);
};

export default CommandInput;
