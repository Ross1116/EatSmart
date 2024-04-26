import axios from "axios";
// import cache from "../config/localstorage";
// import { cache_ttl } from "./Constants";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class Method {
	static GET = "get";
	static POST = "post";
	static PUT = "put";
	static DELETE = "delete";
}

const baseURL =
	"https://go5s0vaedl.execute-api.ap-southeast-2.amazonaws.com/dev/api/";

function sendResponse(response) {
	return {
		error: response.status !== 200,
		data: response.data.message,
	};
}

async function makeNetworkCallWithAuth(options = {}) {
	if (options.id_token != null) {
		console.log("WHAT THE FUCK YOU SARE DOING HERE??????");
		const axiosClient = axios.create({
			baseURL,
			headers: {
				Authorization: `Bearer ${options.id_token}`,
			},
		});

		const axiosConfig = {
			url: options.endpoint,
			method: options.method,
		};

		if (options.method !== Method.GET && options.body != null)
			axiosConfig.data = options.body;

		try {
			const response = await axiosClient.request(axiosConfig);
			return sendResponse(response);
		} catch (err) {
			return sendResponse({
				status: 400,
				data: {
					message: "Unable to make network request",
				},
			});
		}
	}

	return sendResponse({
		status: 400,
		data: { message: "User Unauthenicated" },
	});
}

export async function getProducts(options) {
	return await makeNetworkCallWithAuth({
		endpoint: "/product",
		method: Method.GET,
		id_token: options.id_token,
	});
}

const imageToBase64 = (file) => {
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

export async function addProduct(options) {
	try {
		options.body.image = await imageToBase64(options.body.image);
		return await makeNetworkCallWithAuth({
			endpoint: "/product",
			method: Method.POST,
			id_token: options.id_token,
			body: options.body,
		});
	} catch (err) {
		return sendResponse({
			status: 500,
			data: { message: "Error in processing image" },
		});
	}
}

// const getData = async (endpoint) => {
// 	try {
// 		const response = await axiosClient.get(endpoint);

// 		return {
// 			error: response.status != 200,
// 			data:
// 				response.status != 200
// 					? response.data.message
// 					: JSON.parse(response.data.message),
// 		};
// 	} catch (error) {
// 		return {
// 			error: true,
// 			data: error?.response?.data?.message ?? "Unable to fetch data",
// 		};
// 	}
// };

// async function getDataWithParams(params = {}, cacheKeyFn) {
// 	for (const key in params) {
// 		if (!validParam(params[key])) return null;
// 	}

// 	const paramString = Object.entries(params)
// 		.map(([key, value]) => `${key}=${value}`)
// 		.join("&");

// 	console.log("params: ", paramString);

// 	const cacheKey = cacheKeyFn(params);

// 	const value = cache.get(cacheKey);
// 	if (value == null) {
// 		console.log("calling api for data");
// 		const response = await getData(`uv?${paramString}`);
// 		if (!response.error) {
// 			console.log("saving data to cache");
// 			cache.set(cacheKey, response.data, cache_ttl);
// 		}
// 		return response;
// 	} else {
// 		console.log("returning the local data");
// 		return { error: false, data: value };
// 	}
// }

// export const getDataWithCoord = async (lat = "", lon = "") => {
// 	const response = await getDataWithParams(
// 		{ lat, lon },
// 		({ lat, lon }) => "" + lat + lon,
// 	);
// 	if (response == null)
// 		return { error: true, data: "Invalid latitude and longitude." };

// 	return response;
// };

// export const getDataWithPostcode = async (postcode = "") => {
// 	const response = await getDataWithParams(
// 		{ postcode },
// 		({ postcode }) => postcode,
// 	);
// 	if (response == null) return { error: true, data: "Invalid Postcode" };

// 	return response;
// };
