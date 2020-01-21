const mysql = require('mysql');
const md5 = require('md5');
const _ = require('lodash');
const app = require('../server');

const connection = mysql.createConnection(app.get('config').db);

module.exports = {
	/**
	 * Returns the user that matches the specified id
	 * @param {Number} id
	 * @param {Function} done
	 */
	getById(id, done) {
		connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				const user = rows[0];

				//if there is no avatar use the default one
				if (!user.avatar) {
					user.avatar = app.get('config').uploads.avatars.defaultAvatar;
				}

				done(null, user);
			}
		});
	},
	/**
	 * Returns the user that matches the specified username
	 * @param {String} username
	 * @param {Function} done
	 */
	getByUsername(username, done) {
		connection.query('SELECT * FROM user WHERE username = ?', [username], (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				const user = rows[0];

				//if there is no avatar use the default one
				if (!user.avatar) {
					user.avatar = app.get('config').uploads.avatars.defaultAvatar;
				}

				done(null, user);
			}
		});
	},
	/**
	 * Returns the user that matches the specified email
	 * @param {String} email
	 * @param {Function} done
	 */
	getByEmail(email, done) {
		connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {
			if (err) {
				return done(err);
			}

			if (!rows.length) {
				done(null);
			} else {
				const user = rows[0];

				//if there is no avatar use the default one
				if (!user.avatar) {
					user.avatar = app.get('config').uploads.avatars.defaultAvatar;
				}

				done(null, user);
			}
		});
	},
	/**
	 * Adds new user record
	 * @param {String} username
	 * @param {String} email
	 * @param {String} password
	 * @param {String} avatar
	 * @param {String} type
	 * @param {Function} done
	 */
	create(username, email, password, avatar, type, done) {
		const self = this;

		connection.query('INSERT INTO user (username, email, password, avatar, type, registered, active) VALUES (?, ?, ?, ?, ?, now(), 1)',
			[username, email, md5(password), avatar, type],
			(err, result) => {
				if (err) {
					return done(err);
				}

				//return the inserted record
				self.getByUsername(username, (getErr, userInstance) => {
					if (getErr) {
						return done(getErr);
					}

					done(null, userInstance);
				});
			});
	},
	/**
	 * Updates an existing user record
	 * @param {Number} id
	 * @param {Object} data
	 * @param {Function} done
	 */
	update(id, data, done) {
		const self = this;
		let fields = [];
		const params = [];

		_.forOwn(data, (value, key) => {
			let fieldValue = value;
			fields.push(`${key} = ?`);

			if (key === 'password') {
				fieldValue = md5(fieldValue);
			}

			params.push(fieldValue);
		});

		fields = fields.join(', ');

		params.push(id);

		connection.query(`UPDATE user SET ${fields} WHERE id = ?`, params, (err) => {
			if (err) {
				return done(err);
			}

			//return the updated record
			self.getById(id, (getErr, userInstance) => {
				if (getErr) {
					return done(getErr);
				}

				done(null, userInstance);
			});
		});
	}
};
