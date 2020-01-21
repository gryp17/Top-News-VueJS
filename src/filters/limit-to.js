/**
 * Limits the text string to X characters
 * @param {String} text
 * @param {Number} limit
 * @param {Boolean} dots
 * @returns {String}
 */
export default (text, limit = 100, addDots = true) => {
	const dotsCount = addDots ? 3 : 0;
	const dots = addDots ? '...' : '';

	if (text.length > limit) {
		return text.substr(0, limit - dotsCount) + dots;
	}

	return text;
};
