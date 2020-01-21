
import API from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} username
	 * @param {String} password
	 * @param {Boolean} rememberMe
	 * @returns {Promise}
	 */
	login(username, password, rememberMe) {
		return API.post('/api/user/login', {
			username,
			password,
			rememberMe
		});
	},
	/**
	 * Signs up and logs in the user
	 * @param {Object} data
	 * @returns {Promise}
	 */
	signup(data) {
		return API.post('/api/user', data);
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession() {
		return API.get('/api/user/session');
	},
	/**
	 * Logs out the user
	 * @returns {Promise}
	 */
	logout() {
		return API.get('/api/user/logout');
	},
	/**
	 * Updates the user profile
	 * @param {Object} data
	 * @returns {Promise}
	 */
	update(data) {
		return API.put('/api/user', data);
	},
	/**
	 * Returns the user data for the specified user id
	 * @param {Number} id
	 * @returns {Promise}
	 */
	getUserById(id) {
		return API.get(`/api/user/${id}`);
	}
};
