<template>
	<div class="user-login-modal">

		<BaseModal :visible="visible" @hidden="hideLoginModal">
			<template v-slot:header>
				<h5 class="modal-title">Login</h5>
			</template>
			<template v-slot:body>

				<FormInput
					v-model="username"
					:error="errors.username"
					@keyup.enter="loginUser()"
					@focus="clearError"
					type="text"
					name="username"
					placeholder="Username"
				>
					<template v-slot:input-group-prepend>
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="fas fa-user"></i>
							</span>
						</div>
					</template>
				</FormInput>

				<FormInput
					v-model="password"
					:error="errors.password"
					@keyup.enter="loginUser()"
					@focus="clearError"
					type="password"
					name="password"
					placeholder="Password"
				>
					<template v-slot:input-group-prepend>
						<div class="input-group-prepend">
							<span class="input-group-text">
								<i class="fas fa-lock"></i>
							</span>
						</div>
					</template>
				</FormInput>

				<div class="form-group">
					<input v-model="rememberMe" type="checkbox" id="remember-me-checkbox"/>
					<label for="remember-me-checkbox">
						Remember me?
					</label>

					<button @click="loginUser()" type="button" class="btn btn-primary-light">
						Login
					</button>
				</div>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal.vue';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				username: '',
				password: '',
				rememberMe: false,
				formName: 'login'
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'loginModalOpened'
			}),
			...mapState('form', {
				errors: state => state.errors.login
			})
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible() {
				this.resetState();
				this.resetFormErrors(this.formName);
			}
		},
		methods: {
			...mapActions('user', [
				'login'
			]),
			...mapActions('modals', [
				'hideLoginModal'
			]),
			...mapActions('form', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Tries to authenticate the user with the provided credentials
			 */
			loginUser() {
				this.login({
					username: this.username,
					password: this.password,
					rememberMe: this.rememberMe
				}).then((data) => {
					if (data.user) {
						this.hideLoginModal();
					} else if (data.errors) {
						this.setFormErrors({
							form: this.formName,
							errors: data.errors
						});
					}
				});
			},
			/**
			 * Clears the form errors related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: this.formName,
					field
				});
			},
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.user-login-modal {
		$max-width: 385px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;

			.modal-body{

				.form-group{
					&:last-child{
						margin-bottom: 0px;
					}
				}

				#remember-me-checkbox{
					margin-top: 8px;
					margin-right: 5px;
				}

				label{
					cursor: pointer;
				}

				button{
					float: right;
				}
			}

			@media (min-width: $max-width) {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>
