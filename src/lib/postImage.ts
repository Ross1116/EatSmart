const isString = (data: any): data is string => {
	return typeof data === "string";
};

const toBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

const postImage = async (url: string, file: File): Promise<any> => {
	let base64image = await toBase64(file as File);
	if (isString(base64image)) base64image = base64image.split(",")[1];

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			file: isString(base64image) ? base64image : "",
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	return response;
};

export default postImage;
