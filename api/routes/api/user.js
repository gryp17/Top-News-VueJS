const express = require('express');

const router = express.Router();
const md5 = require('md5');
const multipart = require('connect-multiparty');

const Validator = require('../../middleware/validator');
const Files = require('../../middleware/files');
const UserModel = require('../../models/user');

const rules = {
	signUp: {
		username: ['required', 'min-3', 'max-40', 'unique'],
		email: ['required', 'max-100', 'email', 'unique'],
		password: ['required', 'strong-password', 'max-40'],
		repeatPassword: ['required', 'matches(password)'],
		avatar: ['optional', 'valid-avatar']
	},
	update: {
		currentPassword: ['optional', 'current-password'],
		password: ['optional', 'strong-password', 'max-40'],
		repeatPassword: ['matches(password)'],
		avatar: ['optional', 'valid-avatar']
	},
	login: {
		username: 'required',
		password: 'required',
		rememberMe: ['optional', 'boolean']
	}
};

//sign up
router.post('/', multipart(), Validator.validate(rules.signUp), Files.uploadAvatar, (req, res, next) => {
	const data = req.body;
	const avatar = req.files.avatar ? req.files.avatar.uploadedTo : null;

	//create the new user
	UserModel.create(data.username.trim(), data.email.trim(), data.password.trim(), avatar, 'user', (err, userInstance) => {
		if (err) {
			return next(err);
		}

		//log in the newly created user
		delete userInstance.password;
		req.session.user = userInstance;
		res.json({ user: userInstance });
	});
});

//update user
router.put('/', multipart(), Validator.validate(rules.update), Files.uploadAvatar, (req, res, next) => {
	const data = req.body;
	const avatar = req.files.avatar ? req.files.avatar.uploadedTo : null;

	if (data.password && !data.currentPassword) {
		return res.json({
			errors: {
				currentPassword: 'This field is required'
			}
		});
	}

	const updatedData = {};

	if (data.password) {
		updatedData.password = data.password.trim();
	}

	if (avatar) {
		updatedData.avatar = avatar;
	}

	//check if there is anything to update
	if (Object.keys(updatedData).length === 0) {
		res.json({ user: req.session.user });
	} else {
		UserModel.update(req.session.user.id, updatedData, (err, userInstance) => {
			if (err) {
				return next(err);
			}

			delete userInstance.password;
			req.session.user = userInstance;
			res.json({ user: userInstance });
		});
	}
});

//login
router.post('/login', Validator.validate(rules.login), (req, res, next) => {
	UserModel.getByUsername(req.body.username, (err, result) => {
		if (err) {
			return next(err);
		}

		if (result) {
			if (result.password !== md5(req.body.password)) {
				res.json({
					errors: {
						password: 'Wrong username or password'
					}
				});
			} else {
				delete result.password;

				//set the cookie maxAge to one month if the rememberMe flag is set
				if (req.body.rememberMe) {
					req.session.cookie.maxAge = 3600 * 24 * 30 * 1000; //one month
				}

				req.session.user = result;

				res.json({
					user: result
				});
			}
		} else {
			res.json({
				errors: {
					password: 'Wrong username or password'
				}
			});
		}
	});
});

//get user session/status
router.get('/session', (req, res, next) => {
	res.json({
		user: req.session.user
	});
});

//logout
router.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
		res.json({
			data: 'OK'
		});
	});
});

//get user data
router.get('/:id', (req, res, next) => {
	const userId = parseInt(req.params.id);

	UserModel.getById(userId, (err, result) => {
		if (err) {
			return next(err);
		}

		if (result) {
			delete result.password;
		}

		res.json(result);
	});
});

module.exports = router;
