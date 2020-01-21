const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	//TODO:
	//maybe list all supported API functions?

	res.json({
		data: 'You have called the root /api endpoint'
	});
});

router.use('/config', require('./config'));
router.use('/article', require('./article'));
router.use('/article-comment/', require('./article-comment'));
router.use('/user', require('./user'));

module.exports = router;
