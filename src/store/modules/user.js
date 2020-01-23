import Vue from 'vue';
import UserService from '@/services/user';

export default {
	namespaced: true,
	state: {
		user: null,
		userSession: null
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setUserSession(state, userSession) {
			state.userSession = userSession;
		},
	},
	actions: {
		/**
		 * Logs in the user
		 * @param {Object} context
		 * @param {Object} payload
		 * @returns {Promise}
		 */
		login(context, { username, password, rememberMe }) {
			return UserService.login(username, password, rememberMe).then((res) => {
				if (res.data.user) {
					context.commit('setUserSession', res.data.user);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Login failed'
				});
			});
		},
		/**
		 * Registers the user
		 * @param {Object} context
		 * @param {Object} formData
		 * @returns {Promise}
		 */
		signup(context, formData) {
			return UserService.signup(formData).then((res) => {
				if (res.data.user) {
					context.commit('setUserSession', res.data.user);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Signup failed'
				});
			});
		},
		/**
		 * Fetches the user session
		 * @param {Object} context
		 * @returns {Promise}
		 */
		getUserSession(context) {
			return UserService.getSession().then((res) => {
				if (res.data.user) {
					context.commit('setUserSession', res.data.user);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to retrieve user session'
				});
			});
		},
		/**
		 * Logs out the user
		 * @param {Object} context
		 * @returns {Promise}
		 */
		logout(context) {
			return UserService.logout().then((res) => {
				context.commit('setUserSession', null);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Logout failed'
				});
			});
		},
		/**
		 * Fetches the user data
		 * @param {Object} context
		 * @param {Number} id
		 * @returns {Promise}
		 */
		getUser(context, id) {
			return UserService.getUserById(id).then((res) => {
				if (res.data) {
					context.commit('setUser', res.data);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Get user failed'
				});
			});
		},
		/**
		 * Updates the user data
		 * @param {Object} context
		 * @param {Object} formData
		 * @returns {Promise}
		 */
		updateUser(context, formData) {
			return UserService.update(formData).then((res) => {
				if (res.data.user) {
					context.commit('setUser', res.data.user);
					context.commit('setUserSession', res.data.user);
				}

				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Update user failed'
				});
			});
		},
	}
};
