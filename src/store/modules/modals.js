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
		/**
		 * Shows the login modal
		 * @param {Object} context
		 */
		showLoginModal(context) {
			context.commit('setLoginModalOpened', true);
		},
		/**
		 * Hides the login modal
		 * @param {Object} context
		 */
		hideLoginModal(context) {
			context.commit('setLoginModalOpened', false);
		},
		/**
		 * Shows the signup modal
		 * @param {Object} context
		 */
		showSignupModal(context) {
			context.commit('setSignupModalOpened', true);
		},
		/**
		 * Hides the signup modal
		 * @param {Object} context
		 */
		hideSignupModal(context) {
			context.commit('setSignupModalOpened', false);
		},
		/**
		 * Shows the edit user modal
		 * @param {Object} context
		 */
		showEditUserModal(context) {
			context.commit('setEditUserModalOpened', true);
		},
		/**
		 * Hides the edit user modal
		 * @param {Object} context
		 */
		hideEditUserModal(context) {
			context.commit('setEditUserModalOpened', false);
		},
	}
};
