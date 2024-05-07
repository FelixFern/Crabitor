import { cn } from "@/lib/utils";
import { TCommandItem } from "../useCommandInputImpl";
import styles from "./CommandList.module.css";

const CommandList = ({ commandList }: { commandList: TCommandItem[] }) => {
	return (
		<div className={styles.commandItemList}>
			<p className="mt-2 mb-1 ml-4 font-mono text-xs text-slate-400 dark:text-slate-100">
				Commands
			</p>
			{commandList.length === 0 && (
				<p className="py-2 text-sm text-center text-slate-400 dark:text-slate-100">
					No command not found
				</p>
			)}
			{commandList.map((command, index) => {
				return (
					<div
						tabIndex={index}
						key={command.name}
						className={cn([
							styles.commandItem,
							"focus:bg-slate-200 focus:outline-none hover:bg-slate-200 rounded-md",
						])}
						role="button"
						onClick={() => command.action()}
					>
						{command.icon}
						<p className="text-sm">{command.name}</p>
					</div>
				);
			})}
		</div>
	);
};

export default CommandList;
