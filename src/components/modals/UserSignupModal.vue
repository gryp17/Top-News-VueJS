<template>
	<div class="user-signup-modal">

		<BaseModal :visible="visible" @hidden="hideSignupModal">
			<template v-slot:header>
				<h5 class="modal-title">Sign Up</h5>
			</template>
			<template v-slot:body>

				<FormInput
					v-model="username"
					:error="errors.username"
					@keyup.enter="signupUser()"
					@focus="clearError"
					type="text"
					name="username"
					placeholder="Username"
				></FormInput>

				<FormInput
					v-model="email"
					:error="errors.email"
					@keyup.enter="signupUser()"
					@focus="clearError"
					type="text"
					name="email"
					placeholder="Email"
				></FormInput>

				<FormInput
					v-model="password"
					:error="errors.password"
					@keyup.enter="signupUser()"
					@focus="clearError"
					type="password"
					name="password"
					placeholder="Password"
				></FormInput>

				<FormInput
					v-model="repeatPassword"
					:error="errors.repeatPassword"
					@keyup.enter="signupUser()"
					@focus="clearError"
					type="password"
					name="repeatPassword"
					placeholder="Repeat Password"
				></FormInput>

				<div class="form-group">
					<div class="row no-gutters">
						<div class="col">

							<FormFileInput
								:error="errors.avatar"
								@click="clearError"
								@change="avatarChanged"
								ref="avatar"
								name="avatar"
								label="Avatar (optional)"
							/>

						</div>
						<div class="col">
							<img
								v-show="avatarPreview"
								:src="avatarPreview"
								@click="openFileBrowser()"
								class="avatar-preview"
							/>
						</div>
					</div>
				</div>

				<button
					@click="signupUser()"
					type="button"
					class="btn btn-primary-light sign-up-btn"
				>
					Sign Up
				</button>

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
				email: '',
				password: '',
				repeatPassword: '',
				avatar: null,
				avatarPreview: null,
				formName: 'signup'
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'signupModalOpened'
			}),
			...mapState('form', {
				errors: state => state.errors.signup
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
				'signup'
			]),
			...mapActions('modals', [
				'hideSignupModal'
			]),
			...mapActions('form', [
				'setFormErrors',
				'clearFormError',
				'resetFormErrors'
			]),
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
			 * Calls the openFileBrowser() function that is inside the FormFileInput component
			 */
			openFileBrowser() {
				this.$refs.avatar.openFileBrowser();
			},
			/**
			 * Updates the avatar and avatar preview values whenever the selected file changes
			 * @param {Object} e
			 */
			avatarChanged(e) {
				this.avatar = e.target.files[0];
				this.avatarPreview = URL.createObjectURL(e.target.files[0]);
			},
			/**
			 * Builds the formData object and submits the user data
			 */
			signupUser() {
				const formData = new FormData();

				['username', 'email', 'password', 'repeatPassword', 'avatar'].forEach((field) => {
					if (this[field]) {
						formData.append(field, this[field]);
					}
				});

				this.signup(formData).then((data) => {
					if (data.user) {
						this.hideSignupModal();
					} else if (data.errors) {
						this.setFormErrors({
							form: this.formName,
							errors: data.errors
						});
					}
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
	.user-signup-modal {
		$max-width: 385px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;

			.modal-body{
				.avatar-preview{
					display: block;
					margin: auto;
					margin-top: 15px;
					width: 70px;
					height: 70px;
					border-radius: 100%;
					cursor: pointer;
				}

				.sign-up-btn{
					display: block;
					margin: auto;
				}
			}

			@media (min-width: $max-width) {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
</style>
