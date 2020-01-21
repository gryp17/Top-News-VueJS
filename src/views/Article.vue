<template>
	<div v-if="article">
		<ArticleContent :article="article"/>
		<ArticlesSlider :articles="relatedArticles"/>
		<hr/>
		<ArticleCommentForm
			:articleId="article.id"
			@commentAdded="getComments(article.id, 0)"
		/>
		<ArticleComments
			:items="articleComments"
			:currentPage="page"
			:totalItems="totalComments"
			:totalPages="totalPages"
			@getItemsForPage="getComments(article.id, $event)"
		/>
	</div>
	<NotFound v-else-if="!loading"/>
	<ArticleContentPlaceholder v-else/>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import NotFound from '@/components/NotFound.vue';
	import ArticleContent from '@/components/ArticleContent.vue';
	import ArticleContentPlaceholder from '@/components/ArticleContentPlaceholder.vue';
	import ArticlesSlider from '@/components/ArticlesSlider.vue';
	import ArticleCommentForm from '@/components/ArticleCommentForm.vue';
	import ArticleComments from '@/components/ArticleComments.vue';

	export default {
		components: {
			NotFound,
			ArticleContent,
			ArticleContentPlaceholder,
			ArticlesSlider,
			ArticleCommentForm,
			ArticleComments
		},
		data() {
			return {
				page: 0,
				commentsPerPage: 6,
				totalComments: 0,
				totalPages: 0,
				loading: true
			};
		},
		computed: {
			...mapState('articles', [
				'article',
				'relatedArticles'
			]),
			...mapState('comments', [
				'articleComments'
			])
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
			...mapActions('articles', [
				'getArticle',
				'getRelatedArticles'
			]),
			...mapActions('comments', [
				'getArticleComments'
			]),
			/**
			 * Fetches all the necessary page data
			 */
			getData() {
				this.getArticle(this.$route.params.id).then((article) => {
					if (!article) {
						this.loading = false;
						return;
					}

					Promise.all([
						this.getRelatedArticles({ authorId: article.authorId, limit: 10, offset: 0 }),
						this.getComments(article.id, 0),
					]).then(() => {
						this.loading = false;
					});
				}).catch(() => {
					this.loading = false;
				});
			},
			/**
			 * Fetches a list of article comments that belong to the specified article id
			 * @param {Number} articleId
			 * @param {Number} page
			 * @returns {Promise}
			 */
			getComments(articleId, page) {
				this.page = page;

				const params = {
					id: articleId,
					limit: this.commentsPerPage,
					offset: page * this.commentsPerPage
				};

				return this.getArticleComments(params).then((commentsData) => {
					this.totalComments = commentsData.total;
					this.totalPages = Math.ceil(this.totalComments / this.commentsPerPage);
				});
			}
		}
	};
</script>
