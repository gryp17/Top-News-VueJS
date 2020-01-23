import Vue from 'vue';
import ArticleService from '@/services/article';

export default {
	namespaced: true,
	state: {
		homeArticles: [],
		searchResults: [],
		latest: [],
		popular: {},
		article: null,
		relatedArticles: [],
		articlesByAuthor: []
	},
	mutations: {
		setHomeArticles(state, articles) {
			state.homeArticles = articles;
		},
		setSearchResults(state, articles) {
			state.searchResults = articles;
		},
		setLatestArticles(state, articles) {
			state.latest = articles;
		},
		setPopularArticles(state, { period, articles }) {
			//state.popular[period] = articles;
			//https://vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
			Vue.set(state.popular, period, articles);
		},
		setArticle(state, article) {
			state.article = article;
		},
		setRelatedArticles(state, articles) {
			state.relatedArticles = articles;
		},
		setArticlesByAuthor(state, articles) {
			state.articlesByAuthor = articles;
		}
	},
	actions: {
		getHomeArticles(context) {
			return ArticleService.getArticles('all news', '*', 6, 0).then((res) => {
				context.commit('setHomeArticles', res.data);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the articles'
				});
			});
		},
		search(context, { section, searchTerm, limit, offset }) {
			//reset the search results when the first page is requested
			if (offset === 0) {
				context.commit('setSearchResults', []);
			}

			return ArticleService.getArticles(section, searchTerm, limit, offset).then((res) => {
				context.commit('setSearchResults', context.state.searchResults.concat(res.data));
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the articles'
				});
			});
		},
		getLatestArticles(context) {
			return ArticleService.getArticles('all news', '*', 5, 0).then((res) => {
				context.commit('setLatestArticles', res.data);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to retrieve the latest articles'
				});
			});
		},
		getPopularArticles(context, period) {
			return ArticleService.getMostPopular(period, 5).then((res) => {
				context.commit('setPopularArticles', {
					period,
					articles: res.data
				});
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to retrieve the most popular articles'
				});
			});
		},
		getArticle(context, id) {
			return ArticleService.getArticleById(id).then((res) => {
				context.commit('setArticle', res.data);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the article data'
				});
			});
		},
		getRelatedArticles(context, { authorId, limit, offset }) {
			return ArticleService.getArticlesByAuthor(authorId, limit, offset).then((res) => {
				context.commit('setRelatedArticles', res.data.articles);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the related articles'
				});
			});
		},
		getArticlesByAuthor(context, { id, limit, offset }) {
			return ArticleService.getArticlesByAuthor(id, limit, offset).then((res) => {
				context.commit('setArticlesByAuthor', res.data.articles);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the articles by author'
				});
			});
		},
		deleteArticle(context, { id }) {
			return ArticleService.delete(id).then((res) => {
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to delete the article'
				});
			});
		},
		addArticle(context, data) {
			return ArticleService.create(data).then((res) => {
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to create the article'
				});
			});
		},
		updateArticle(context, { id, data }) {
			return ArticleService.update(id, data).then((res) => {
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to update the article'
				});
			});
		}
	}
};
