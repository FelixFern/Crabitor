import { ArrowBigUp, Command } from "lucide-react";

const Hotkey = ({ name, keys }: { name: string; keys: React.ReactNode[] }) => {
	return (
		<div className="flex justify-between w-full">
			<div className="text-slate-800 dark:text-slate-200">{name}</div>
			<div className="flex items-center gap-1">
				<>
					{keys.map((val) => {
						return (
							<div className="flex items-center justify-center h-5 px-2 bg-orange-500 rounded-sm opacity-50 min-w-5 text-slate-200">
								{val}
							</div>
						);
					})}
				</>
			</div>
		</div>
	);
};

const EmptyScreen = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="font-mono text-3xl text-orange-500">
					Welcome to Crabitor
				</h1>
				<p>Tauri Based Markdown Editor</p>
			</div>
			<div className="flex flex-col w-1/4 gap-2 mt-24 font-mono text-sm">
				<Hotkey
					name="Create New File"
					keys={[<Command size={12} />, "N"]}
				/>
				<Hotkey
					name="Open Command Input"
					keys={[
						<Command size={12} />,
						<ArrowBigUp size={16} />,
						"K",
					]}
				/>
				<Hotkey
					name="Navigate Through Note"
					keys={[<Command size={12} />, "0-9"]}
				/>
			</div>
		</div>
	);
};

export default EmptyScreen;
