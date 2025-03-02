/**
 * Capitalizes the passed string
 * @param {String} value
 * @returns {Promise}
 */
export default (value) => {
	if (!value) {
		return '';
	}

	const string = value.toString();
	return string.charAt(0).toUpperCase() + string.slice(1);
};
