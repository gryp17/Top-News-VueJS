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
