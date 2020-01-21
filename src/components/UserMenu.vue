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

			<a
				v-if="user.type === 'admin'"
				class="dropdown-item"
				href="#"
			>
				Add article
			</a>

			<div class="dropdown-divider"></div>

			<button @click="logout" class="dropdown-item">
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
			])
		}
	};
</script>
