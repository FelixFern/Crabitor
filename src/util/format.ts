import moment from "moment";

export const getFileName = (path: string) => {
	const splitted = path.split("/");
	return splitted[splitted.length - 1].split(".")[0];
};

export const splitFilePath = (path: string) => {
	return path.split("/");
};

export const formatDate = (dateString: string) => {
	let temp = dateString.split(" ");
	temp[0] = temp[0] + "T";

	return moment(new Date(temp.join(""))).format("DD/MM/YYYY HH:mm:ss");
};
