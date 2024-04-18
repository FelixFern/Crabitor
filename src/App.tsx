import "./App.css";
import { Sidebar, ThemeProvider } from "./components/custom";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex items-center w-screen max-h-screen overflow-hidden">
				<Sidebar />
				<div className="min-h-screen p-6"></div>
			</div>
			<Toaster />
		</ThemeProvider>
	);
}

export default App;
