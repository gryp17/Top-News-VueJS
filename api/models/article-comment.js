const mysql = require('mysql');
const app = require('../server');

const connection = mysql.createConnection(app.get('config').db);

module.exports = {
	/**
	 * Returns all article comments for the specified article id
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	getComments(articleId, limit, offset, done) {
		const query = 'SELECT article_comment.id, article_comment.content, article_comment.date, user.id as authorId, user.username, user.avatar FROM article_comment, user '
		+ 'WHERE article_comment.authorId = user.id AND article_comment.articleId = ? ORDER BY date DESC LIMIT ? OFFSET ?';

		connection.query(query, [articleId, limit, offset], (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null, []);
			} else {
				rows.forEach((comment) => {
					//if there is no avatar use the default one
					if (!comment.avatar) {
						comment.avatar = app.get('config').uploads.avatars.defaultAvatar;
					}
				});

				done(null, rows);
			}
		});
	},
	/**
	 * Returns the total number of comments for the specified article id
	 * @param {Number} articleId
	 * @param {Function} done
	 */
	getTotalComments(articleId, done) {
		const query = 'SELECT COUNT(id) AS count FROM article_comment WHERE article_comment.articleId = ?';

		connection.query(query, articleId, (err, rows) => {
			if (err) {
				return done(err);
			}

			done(null, rows[0].count);
		});
	},
	/**
	 * Returns all article comments from the specified author id
	 * @param {Number} authorId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	getCommentsByAuthor(authorId, limit, offset, done) {
		const query = 'SELECT article_comment.id, article_comment.content, article_comment.date, article_comment.articleId, article.title as articleTitle, user.id as authorId, user.username, user.avatar FROM article_comment, article, user '
		+ 'WHERE article_comment.articleId = article.id AND article_comment.authorId = user.id AND article_comment.authorId = ? ORDER BY date DESC LIMIT ? OFFSET ?';

		connection.query(query, [authorId, limit, offset], (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null, []);
			} else {
				rows.forEach((comment) => {
					//if there is no avatar use the default one
					if (!comment.avatar) {
						comment.avatar = app.get('config').uploads.avatars.defaultAvatar;
					}
				});

				done(null, rows);
			}
		});
	},
	/**
	 * Returns the total number of comments for the specified author id
	 * @param {Number} authorId
	 * @param {Function} done
	 */
	getTotalCommentsByAuthor(authorId, done) {
		const query = 'SELECT COUNT(id) AS count FROM article_comment WHERE article_comment.authorId = ?';

		connection.query(query, authorId, (err, rows) => {
			if (err) {
				return done(err);
			}

			done(null, rows[0].count);
		});
	},
	/**
	 * Adds a new article_comment record
	 * @param {Number} articleId
	 * @param {Number} authorId
	 * @param {String} content
	 * @param {Function} done
	 */
	create(articleId, authorId, content, done) {
		const query = 'INSERT INTO article_comment (articleId, authorId, content, date) VALUES (?, ?, ?, now())';
		connection.query(query, [articleId, authorId, content], done);
	}
};
