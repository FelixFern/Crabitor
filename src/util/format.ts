export const getFileName = (path: string) => {
	const splitted = path.split("/");
	return splitted[splitted.length - 1].split(".")[0];
};
