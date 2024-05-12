import { cn } from "@/lib/utils";
import { CommandInputState } from "@/state";
import { useSetRecoilState } from "recoil";
import { TCommandItem } from "../useCommandInputImpl";
import styles from "./CommandList.module.css";

const CommandList = ({ commandList }: { commandList: TCommandItem[] }) => {
  const setCommandInput = useSetRecoilState(CommandInputState);

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
      {commandList.map((command) => {
        return (
          <div
            tabIndex={0}
            key={command.name}
            className={cn([
              styles.commandItem,
              "focus:bg-slate-200 focus:outline-none hover:bg-slate-200 dark:hover:bg-slate-900 rounded-md",
            ])}
            role="button"
            onClick={() => {
              command.action();
              setCommandInput(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                command.action();
                setCommandInput(false);
              }
            }}
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
