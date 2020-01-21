module.exports = {
	/**
	 * Checks if the user is logged in
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Function} next
	 */
	isLoggedIn(req, res, next) {
		if (req.session.user) {
			next();
		} else {
			res.json({
				errors: {
					user: 'Your session has expired'
				}
			});
		}
	}
};
