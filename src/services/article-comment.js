import API from './API';

export default {
	/**
	 * Returns all article comments
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getComments(articleId, limit, offset) {
		return API.get(`/api/article-comment/article/${articleId}/${limit}/${offset}`);
	},
	/**
	 * Adds new article comment
	 * @param {Number} articleId
	 * @param {String} content
	 * @returns {Promise}
	 */
	addComment(articleId, content) {
		return API.post('/api/article-comment', {
			articleId,
			content
		});
	},
	/**
	 * Returns all article comments by the specified author id
	 * @param {Number} authorId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getCommentsByAuthor(authorId, limit, offset) {
		return API.get(`/api/article-comment/author/${authorId}/${limit}/${offset}`);
	}
};
