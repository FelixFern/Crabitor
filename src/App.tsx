import "./App.css";
import { Sidebar, ThemeProvider } from "./components/custom";
import { Button } from "./components/ui/button";
import { useEditorImpl, useNoteData } from "./hooks";

function App() {
	const {} = useEditorImpl();
	const { getNoteList } = useNoteData();
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex items-center w-screen max-h-screen overflow-hidden">
				<Sidebar />
				<div className="min-h-screen p-6">
					<Button
						onClick={() => {
							getNoteList();
						}}
					>
						Testing
					</Button>
					{/* <h1 className="text-xl font-bold">Document Title</h1> */}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
