const express = require('express');
const router = express.Router();

//get server/directories config
router.get('/', (req, res, next) => {
	const config = req.app.get('config');

	res.json({
		uploads: config.uploads
	});
});

module.exports = router;
