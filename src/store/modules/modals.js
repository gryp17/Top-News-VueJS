export default {
	namespaced: true,
	state: {
		loginModalOpened: false,
		signupModalOpened: false,
		editUserModalOpened: false
	},
	mutations: {
		setLoginModalOpened(state, opened) {
			state.loginModalOpened = opened;
		},
		setSignupModalOpened(state, opened) {
			state.signupModalOpened = opened;
		},
		setEditUserModalOpened(state, opened) {
			state.editUserModalOpened = opened;
		}
	},
	actions: {
		showLoginModal(context) {
			context.commit('setLoginModalOpened', true);
		},
		hideLoginModal(context) {
			context.commit('setLoginModalOpened', false);
		},
		showSignupModal(context) {
			context.commit('setSignupModalOpened', true);
		},
		hideSignupModal(context) {
			context.commit('setSignupModalOpened', false);
		},
		showEditUserModal(context) {
			context.commit('setEditUserModalOpened', true);
		},
		hideEditUserModal(context) {
			context.commit('setEditUserModalOpened', false);
		},
	}
};
