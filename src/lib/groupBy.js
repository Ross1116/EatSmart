/**
 * This function groups the elements of an array based on the classifier function
 * and returns the object.
 *
 * @param {any[]} array An array of elements
 * @param {function(any):string} classifier A function which determines the group of each element inside array.
 * @returns {object} An object containing the group keys and their value as an array an containing
 * all the elements which falls under that particular group.
 */
function groupBy(array, classifier) {
	if (!Array.isArray(array))
		throw new Error("Invalid argument, array must be of type Array.");

	if (typeof classifier !== "function")
		throw new Error("Invalid argument, classifier must be of type Function.");

	const result = {};
	for (const ele of array) {
		const key = classifier(ele);
		if (!Object.hasOwn(result, key)) result[key] = [];
		result[key].push(ele);
	}
	return result;
}

export function categorizeProduct(expiry) {
	const timeDiff = new Date(expiry * 1000).getTime() - new Date().getTime();

	const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

	if (dayDiff < 0) return "expired";
	if (dayDiff <= 3) return "3";
	if (dayDiff <= 6) return "6";
	return "week";
}

export function groupProducts(products) {
	return groupBy(products, categorizeProduct);
}
