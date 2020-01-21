<template>
	<ArticleCardsList>
		<ArticleCard v-for="article in homeArticles" :key="article.id" :article="article" />
	</ArticleCardsList>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import ArticleCardsList from '@/components/ArticleCardsList.vue';
	import ArticleCard from '@/components/ArticleCard.vue';

	export default {
		components: {
			ArticleCardsList,
			ArticleCard
		},
		computed: {
			...mapState('articles', [
				'homeArticles'
			])
		},
		created() {
			this.getHomeArticles();
		},
		methods: {
			...mapActions('articles', [
				'getHomeArticles'
			])
		}
	};
</script>
