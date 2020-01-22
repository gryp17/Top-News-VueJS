<template>
	<div class="user-menu">
		<ActionsDropdown>
			<template v-slot:button>
				{{ user.username }}
				<i class="fas fa-cog"></i>
			</template>

			<router-link
				:to="{name: 'user', params: {id: user.id}}"
				class="dropdown-item"
			>
				My Profile
			</router-link>

			<router-link
				v-if="user.type === 'admin'"
				:to="{name: 'add-article'}"
				class="dropdown-item"
			>
				Add Article
			</router-link>

			<div class="dropdown-divider"></div>

			<button @click="onLogout" class="dropdown-item">
				Logout
			</button>
		</ActionsDropdown>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import ActionsDropdown from '@/components/ActionsDropdown.vue';

	export default {
		components: {
			ActionsDropdown
		},
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		methods: {
			...mapActions('user', [
				'logout'
			]),
			onLogout() {
				this.logout().then(() => {
					this.$router.push({ name: 'home' });
				});
			}
		}
	};
</script>
