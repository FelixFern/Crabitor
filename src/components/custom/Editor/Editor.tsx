import Breadcrumb from "./Breadcrumb";
import { useEditorImpl } from "./useEditorImpl";

const Editor = () => {
	const { filePath } = useEditorImpl();
	return (
		<div className="w-full h-screen p-10">
			<Breadcrumb filePath={filePath ?? ""} />
		</div>
	);
};

export default Editor;
