const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
module.exports = app;

//get the environment
const environment = process.env.NODE_ENV || 'development';

//get config from the environment
const config = require(`./config/${environment}`);

//store the config
app.set('config', config);

//create a session mysql store and save it in the app so that can be accessed from the other modules
const sessionStore = new MySQLStore({
	host: config.db.host,
	database: config.db.database,
	user: config.db.user,
	password: config.db.password,
	schema: {
		tableName: config.session.tableName
	}
});

app.set('sessionStore', sessionStore);

app.use(session({
	store: sessionStore,
	secret: config.session.secret,
	key: config.session.sessionId,
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const publicDir = path.join(__dirname, '../dist');

//set the "public" directory as static
app.use(express.static(publicDir));
app.use(favicon(path.join(publicDir, 'favicon.ico')));

//routes
app.use('/api', require('./routes/api'));
app.use('/cdn', require('./routes/cdn'));

//redirect all other GET requests to the index.html file (all routing is handled by the frontend router)
app.get('*', (req, res) => {
	res.sendFile(`${publicDir}/index.html`);
});

//redirect the rest of the requests (probably AJAX POST requests) to the not found handler
app.all('*', (req, res) => {
	res.status(404).json({
		errors: {
			api: 'URL not found'
		}
	});
});

app.listen(config.port, () => {
	console.log(`listening on port ${config.port}`);
});
