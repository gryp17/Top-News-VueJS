<template>
	<div class="user-page-wrapper">

		<div v-if="user">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">
						User Details
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="articles-tab" data-toggle="tab" href="#articles" role="tab" aria-controls="articles" aria-selected="false">
						User Articles
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">
						User Activity
					</a>
				</li>
			</ul>

			<div class="tab-content">
				<div class="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
					<UserDetails
						:user="user"
						:canEdit="canEditProfile"
					/>
				</div>
				<div class="tab-pane fade" id="articles" role="tabpanel" aria-labelledby="articles-tab">
					<UserArticles
						:canEdit="canEditProfile"
						:items="articlesByAuthor"
						:currentPage="articlesPage"
						:totalItems="totalArticles"
						:totalPages="totalArticlesPages"
						@getItemsForPage="getUserArticles(user.id, $event)"
					/>
				</div>
				<div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
					<UserActivity
						:items="commentsByAuthor"
						:currentPage="commentsPage"
						:totalItems="totalComments"
						:totalPages="totalCommentsPages"
						@getItemsForPage="getUserComments(user.id, $event)"
					/>
				</div>
			</div>
		</div>
		<NotFound v-else-if="!loading"/>

		<EditUserModal />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import NotFound from '@/components/NotFound.vue';
	import UserDetails from '@/components/UserDetails.vue';
	import UserArticles from '@/components/UserArticles.vue';
	import UserActivity from '@/components/UserActivity.vue';
	import EditUserModal from '@/components/modals/EditUserModal.vue';

	export default {
		components: {
			NotFound,
			UserDetails,
			UserArticles,
			UserActivity,
			EditUserModal
		},
		data() {
			return {
				articlesPage: 0,
				articlesPerPage: 10,
				totalArticles: 0,
				totalArticlesPages: 0,
				commentsPage: 0,
				commentsPerPage: 10,
				totalComments: 0,
				totalCommentsPages: 0,
				loading: true
			};
		},
		computed: {
			...mapState('user', [
				'userSession',
				'user'
			]),
			...mapState('articles', [
				'articlesByAuthor'
			]),
			...mapState('comments', [
				'commentsByAuthor'
			]),
			canEditProfile() {
				return this.userSession && this.userSession.id === this.user.id;
			}
		},
		created() {
			this.getData();
		},
		watch: {
			$route(route, prevRoute) {
				if (route.params.id !== prevRoute.params.id) {
					this.getData();
				}
			}
		},
		methods: {
			...mapActions('user', [
				'getUser'
			]),
			...mapActions('articles', [
				'getArticlesByAuthor'
			]),
			...mapActions('comments', [
				'getCommentsByAuthor'
			]),
			getData() {
				this.getUser(this.$route.params.id).then((user) => {
					if (!user) {
						this.loading = false;
						return;
					}

					Promise.all([
						this.getUserArticles(user.id, 0),
						this.getUserComments(user.id, 0)
					]).then(() => {
						this.loading = false;
					});
				}).catch(() => {
					this.loading = false;
				});
			},
			getUserArticles(id, page) {
				this.articlesPage = page;

				const params = {
					id,
					limit: this.articlesPerPage,
					offset: page * this.articlesPerPage
				};

				return this.getArticlesByAuthor(params).then((articlesData) => {
					this.totalArticles = articlesData.total;
					this.totalArticlesPages = Math.ceil(this.totalArticles / this.articlesPerPage);
				});
			},
			getUserComments(id, page) {
				this.commentsPage = page;

				const params = {
					id,
					limit: this.commentsPerPage,
					offset: page * this.commentsPerPage
				};

				return this.getCommentsByAuthor(params).then((commentsData) => {
					this.totalComments = commentsData.total;
					this.totalCommentsPages = Math.ceil(this.totalComments / this.commentsPerPage);
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.user-page-wrapper {
		margin-top: 10px;
	}
</style>
