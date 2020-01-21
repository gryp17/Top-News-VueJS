<template>
	<div class="user-details">
		<h4>
			{{ user.username }}
		</h4>

		<hr/>

		<button
			v-if="canEdit"
			@click="showEditUserModal"
			class="btn btn-success btn-edit"
		>
			<i class="far fa-edit"></i>
			Edit
		</button>

		<div class="clearfix"></div>

		<div class="row no-gutters">
			<div class="col-md-5 details-avatar-wrapper">
				<img :src="avatar"/>
			</div>
			<div class="col-md-7 info-wrapper">
				<div class="item">
					<strong>Username:</strong> {{ user.username }}
				</div>
				<div class="item">
					<strong>Status:</strong> {{ status }}
				</div>
				<div class="item">
					<strong>Account Type:</strong> {{ user.type }}
				</div>
				<div class="item">
					<strong>Registered:</strong>
					<span :title="registeredDateLong">
						{{ registeredDate }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import moment from 'moment';

	export default {
		props: {
			user: Object,
			canEdit: Boolean
		},
		computed: {
			...mapGetters([
				'avatarsDirectory'
			]),
			avatar() {
				return this.avatarsDirectory + this.user.avatar;
			},
			status() {
				return this.user.active === 1 ? 'Active' : 'Inactive';
			},
			registeredDate() {
				return moment(this.user.registered).from(moment());
			},
			registeredDateLong() {
				return moment(this.user.registered).format('YYYY-MM-DD hh:mm:ss');
			}
		},
		methods: {
			...mapActions('modals', [
				'showEditUserModal'
			])
		}
	};
</script>

<style scoped lang="scss">
	.user-details {
		margin-top: 15px;

		h4 {
			text-align: center;
		}

		.btn-edit {
			float: right;

			.fa-edit {
				margin-top: -3px;
			}
		}

		.details-avatar-wrapper {
			text-align: center;

			img {
				width: 130px;
				height: 130px;
				border-radius: 100%;
			}
		}

		.info-wrapper {
			margin-top: 20px;
		}

		@media (max-width: 400px) {
			.btn-edit {
				width: 100%;
				margin-bottom: 10px;
			}
		}
	}
</style>
