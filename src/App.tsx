import { RecoilRoot } from "recoil";
import "./App.css";
import { Sidebar, ThemeProvider } from "./components/custom";
import Editor from "./components/custom/Editor/Editor";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<RecoilRoot>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<div className="flex items-center w-screen max-h-screen overflow-hidden">
					<Sidebar />
					<Editor />
					<div className="min-h-screen p-6"></div>
				</div>
				<Toaster />
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
