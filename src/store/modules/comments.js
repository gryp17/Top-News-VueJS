import Vue from 'vue';
import ArticleCommentService from '@/services/article-comment';

export default {
	namespaced: true,
	state: {
		articleComments: [],
		commentsByAuthor: []
	},
	mutations: {
		setArticleComments(state, comments) {
			state.articleComments = comments;
		},
		setCommentsByAuthor(state, articles) {
			state.commentsByAuthor = articles;
		}
	},
	actions: {
		/**
		 * Fetches the article comments
		 * @param {Object} context
		 * @param {Object} payload
		 * @returns {Promise}
		 */
		getArticleComments(context, { id, limit, offset }) {
			return ArticleCommentService.getComments(id, limit, offset).then((res) => {
				context.commit('setArticleComments', res.data.comments);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the article comments'
				});
			});
		},
		/**
		 * Fetches the article comments by author
		 * @param {Object} context
		 * @param {Object} payload
		 * @returns {Promise}
		 */
		getCommentsByAuthor(context, { id, limit, offset }) {
			return ArticleCommentService.getCommentsByAuthor(id, limit, offset).then((res) => {
				context.commit('setCommentsByAuthor', res.data.comments);
				return res.data;
			}).catch(() => {
				Vue.toasted.global.apiError({
					message: 'Failed to fetch the article comments by author'
				});
			});
		}
	}
};
