module.exports = {
	port: 3000,
	session: {
		secret: 'mysupersecretsessionsecret',
		sessionId: 'topnews.sid',
		tableName: 'session'
	},
	db: {
		host: '127.0.0.1',
		database: 'top-news-vuejs',
		user: 'plamen',
		password: '1234'
	},
	uploads: {
		avatars: {
			directory: './uploads/avatars/',
			maxSize: 1000000,
			validExtensions: ['png', 'jpg', 'jpeg'],
			defaultAvatar: 'default.png'
		},
		articles: {
			directory: './uploads/articles/',
			maxSize: 10000000,
			validExtensions: ['png', 'jpg', 'jpeg']
		}
	}
};
