const mysql = require('mysql');
const app = require('../server');

const connection = mysql.createConnection(app.get('config').db);

module.exports = {
	/**
	 * Adds an article view record
	 * @param {Number} id
	 * @param {Number} userId (optional)
	 * @param {Function} done
	 */
	addArticleView(id, userId, done) {
		const query = 'INSERT INTO article_view (articleId, userId, date) VALUES (?, ?, now())';
		connection.query(query, [id, userId], done);
	}
};
