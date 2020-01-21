<template>
	<div class="row no-gutters user-panel">
		<template v-if="userSession">
			<div class="col">
				<UserMenu :user="userSession"/>
			</div>
		</template>
		<template v-else>
			<div class="col">
				<button @click="showLoginModal()" class="btn btn-link">
					<i class="fas fa-sign-in-alt"></i>
					Login
				</button>
			</div>
			<div class="col">
				<button @click="showSignupModal()" class="btn btn-link">
					<i class="fas fa-user-plus"></i>
					Sign Up
				</button>
			</div>
		</template>

		<UserLoginModal/>
		<UserSignupModal/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import UserLoginModal from '@/components/modals/UserLoginModal.vue';
	import UserSignupModal from '@/components/modals/UserSignupModal.vue';
	import UserMenu from '@/components/UserMenu.vue';

	export default {
		components: {
			UserLoginModal,
			UserSignupModal,
			UserMenu
		},
		computed: {
			...mapState('user', [
				'userSession'
			])
		},
		methods: {
			...mapActions('modals', [
				'showLoginModal',
				'showSignupModal'
			])
		}
	};
</script>

<style scoped lang="scss">
	.user-panel {
		text-align: center;
	}
</style>
