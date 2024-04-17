import "./App.css";
import { Sidebar, ThemeProvider } from "./components/custom";
import { useEditorImpl } from "./hooks";

function App() {
	const {} = useEditorImpl();
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="w-screen h-screen flex flex-grow items-center">
				<Sidebar />
				<div className="p-6 min-h-screen">
					<h1 className="text-xl font-bold">Document Title</h1>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
