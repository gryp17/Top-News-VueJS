<template>
	<div class="edit-article-page">
		<template v-if="article">
			<h4>Edit Article</h4>
			<hr />
			<ArticleForm :article="article" />
		</template>
		<NotFound v-else-if="!loading"/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ArticleForm from '@/components/ArticleForm.vue';
	import NotFound from '@/components/NotFound.vue';

	export default {
		components: {
			ArticleForm,
			NotFound
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('articles', [
				'article'
			])
		},
		created() {
			this.getArticle(this.$route.params.id).then(() => {
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		methods: {
			...mapActions('articles', [
				'getArticle'
			])
		}
	};
</script>

<style scoped lang="scss">
	.edit-article-page {
		padding-top: 20px;
	}
</style>
