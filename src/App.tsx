import { RecoilRoot } from "recoil";
import "./App.css";
import {
	Editor,
	KeyPressListener,
	Sidebar,
	ThemeProvider,
} from "./components/custom";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<RecoilRoot>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<KeyPressListener>
					<div className="flex items-center w-screen max-h-screen overflow-hidden">
						<Sidebar />
						<Editor />
					</div>
					<Toaster />
				</KeyPressListener>
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
