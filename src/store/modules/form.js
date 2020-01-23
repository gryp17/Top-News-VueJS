import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		errors: {
			login: {},
			signup: {},
			editProfile: {},
			articleComment: {},
			article: {}
		}
	},
	mutations: {
		setFormError(state, { form, field, error }) {
			Vue.set(state.errors[form], field, error);
		},
		resetFormErrors(state, form) {
			Vue.set(state.errors, form, {});
		}
	},
	actions: {
		/**
		 * Clears a single form error field
		 * @param {Object} context
		 * @param {Object} payload
		 */
		clearFormError(context, { form, field }) {
			context.commit('setFormError', {
				form,
				field,
				error: null
			});
		},
		/**
		 * Sets the form errors
		 * @param {Object} context
		 * @param {Object} payload
		 */
		setFormErrors(context, { form, errors }) {
			Object.keys(errors).forEach((field) => {
				context.commit('setFormError', {
					form,
					field,
					error: errors[field]
				});
			});
		},
		/**
		 * Resets the form errors
		 * @param {Object} context
		 * @param {String} form
		 */
		resetFormErrors(context, form) {
			context.commit('resetFormErrors', form);
		}
	}
};
