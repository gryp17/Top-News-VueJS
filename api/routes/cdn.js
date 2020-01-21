const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

//handle all uploads file requests
router.get('/uploads/:type/:file', (req, res, next) => {
	const config = req.app.get('config');

	const type = req.params.type;
	const file = req.params.file;

	if (!config.uploads[type]) {
		return res.sendStatus(404);
	}

	const filePath = path.join(__dirname, '../', config.uploads[type].directory, file);

	fs.stat(filePath, (err) => {
		if (err) {
			return res.sendStatus(404);
		}

		res.sendFile(filePath);
	});
});

module.exports = router;
