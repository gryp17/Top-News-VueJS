const mysql = require('mysql');
const moment = require('moment');
const _ = require('lodash');
const app = require('../server');

const connection = mysql.createConnection(app.get('config').db);

module.exports = {
	/**
	 * Returns all articles that match the specified criterias
	 * @param {String} category
	 * @param {String} searchTerm
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	search(category, searchTerm, limit, offset, done) {
		const whereClauses = [];
		const whereParams = [];

		const paginationParams = [
			limit,
			offset
		];

		if (category !== 'all news') {
			whereClauses.push('AND category.name = ?');
			whereParams.push(category);
		}

		if (searchTerm !== '*') {
			whereClauses.push('AND (content LIKE ? OR title LIKE ?)');
			whereParams.push(`%${searchTerm}%`);
			whereParams.push(`%${searchTerm}%`);
		}

		const query = `SELECT article.id, title, summary, content, image, date, category.name as categoryName FROM article, category WHERE article.categoryId = category.id ${whereClauses.join(' ')} ORDER BY date DESC LIMIT ? OFFSET ?`;
		const params = whereParams.concat(paginationParams);

		connection.query(query, params, done);
	},
	/**
	 * Returns the article that matches the specified article id
	 * @param {Number} id
	 * @param {Function} done
	 */
	getById(id, done) {
		const query = 'SELECT article.id, authorId, title, summary, content, image, article.date, categoryId, category.name as categoryName, user.username as authorName, user.avatar as authorAvatar, count(article_view.id) as views '
		+ 'FROM article LEFT JOIN article_view ON article.id = article_view.articleId, category, user '
		+ 'WHERE article.categoryId = category.id AND user.id = article.authorId AND article.id = ? GROUP BY article.id';

		connection.query(query, id, (err, rows) => {
			if (err) {
				return done(err);
			}

			const article = rows[0];

			if (article) {
				//if there is no avatar use the default one
				if (!article.authorAvatar) {
					article.authorAvatar = app.get('config').uploads.avatars.defaultAvatar;
				}
			}

			done(null, article || null);
		});
	},
	/**
	 * Returns all articles by the specified author id
	 * @param {Number} authorId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	getByAuthor(authorId, limit, offset, done) {
		const query = 'SELECT article.id, authorId, title, summary, content, image, date, category.name as categoryName, user.username as authorName FROM article, category, user WHERE article.categoryId = category.id AND user.id = article.authorId AND authorId = ? ORDER BY date DESC LIMIT ? OFFSET ?';
		const params = [authorId, limit, offset];
		connection.query(query, params, (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null, []);
			} else {
				done(null, rows);
			}
		});
	},
	/**
	 * Returns the total number of articles that belong to the specified author id
	 * @param {Number} authorId
	 * @param {Function} done
	 */
	getTotalByAuthor(authorId, done) {
		const query = 'SELECT COUNT(id) as count FROM article WHERE authorId = ?';
		const params = [authorId];
		connection.query(query, params, (err, rows) => {
			if (err) {
				return done(err);
			}

			done(null, rows[0].count);
		});
	},
	/**
	 * Returns the articles with the most views in the specified period
	 * @param {String} periodType ("today", "this week", "all time")
	 * @param {Number} limit
	 * @param {Function} done
	 */
	getMostPopular(periodType, limit, done) {
		let dateCondition = '';

		if (periodType === 'today') {
			dateCondition = `WHERE article_view.date > '${moment().startOf('day').format()}'`;
		} else if (periodType === 'this week') {
			dateCondition = `WHERE article_view.date > '${moment().startOf('week').format()}'`;
		}

		const query = `${'SELECT article.id, title, article.date, image, views FROM '
		+ '(SELECT id, articleId, COUNT(id) AS views FROM article_view '}${dateCondition} GROUP BY articleId) article_view `
		+ 'RIGHT OUTER JOIN article ON article.id = article_view.articleId '
		+ 'GROUP BY article.id ORDER BY views DESC, article.date DESC LIMIT ?';
		connection.query(query, limit, done);
	},
	/**
	 * Inserts new article record
	 * @param {Number} categoryId
	 * @param {String} title
	 * @param {String} summary
	 * @param {String} content
	 * @param {String} image
	 * @param {Number} authorId
	 * @param {Function} done
	 */
	create(categoryId, title, summary, content, image, authorId, done) {
		connection.query('INSERT INTO article (categoryId, title, summary, content, image, authorId, date) VALUES (?, ?, ?, ?, ?, ?, now())',
			[categoryId, title, summary, content, image, authorId], (err, result) => {
				if (err) {
					return done(err);
				}

				//return the inserted record
				this.getById(result.insertId, (getErr, articleInstance) => {
					if (getErr) {
						return done(getErr);
					}

					done(null, articleInstance);
				});
			});
	},
	/**
	 * Updates the article record
	 * @param {Number} id
	 * @param {Object} data
	 * @param {Function} done
	 */
	update(id, data, done) {
		const self = this;
		let fields = [];
		const params = [];

		_.forOwn(data, (value, key) => {
			if (!value) {
				return;
			}

			fields.push(`${key} = ?`);
			params.push(value);
		});

		fields = fields.join(', ');

		params.push(id);

		connection.query(`UPDATE article SET ${fields} WHERE id = ?`, params, (err) => {
			if (err) {
				return done(err);
			}

			//return the updated record
			self.getById(id, (getErr, articleInstance) => {
				if (getErr) {
					return done(getErr);
				}

				done(null, articleInstance);
			});
		});
	},
	/**
     * Deletes the specified article id
     * @param {Number} id
     * @param {Function} done
     */
	delete(id, done) {
		connection.query('DELETE FROM article WHERE id = ?', [id], done);
	}
};
