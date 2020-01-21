const express = require('express');
const async = require('async');

const router = express.Router();

const Session = require('../../middleware/session');
const Validator = require('../../middleware/validator');

const ArticleCommentModel = require('../../models/article-comment');

const rules = {
	addComment: {
		articleId: ['required', 'integer', 'existing-article-id'],
		content: ['required', 'min-3', 'max-500']
	}
};

//add new comment
router.post('/', Session.isLoggedIn, Validator.validate(rules.addComment), (req, res, next) => {
	const data = req.body;

	ArticleCommentModel.create(data.articleId, req.session.user.id, data.content, (err, result) => {
		if (err) {
			return next(err);
		}

		res.json({
			id: result.insertId
		});
	});
});

//get the latest article comments for the specified article id
router.get('/article/:id/:limit/:offset', (req, res, next) => {
	async.parallel([
		//get the comments
		(done) => {
			ArticleCommentModel.getComments(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), done);
		},
		//get the total number of comments
		(done) => {
			ArticleCommentModel.getTotalComments(req.params.id, done);
		}
	], (err, results) => {
		if (err) {
			return next(err);
		}

		res.json({
			comments: results[0],
			total: results[1]
		});
	});
});

//get the latest article comments from the specified author
router.get('/author/:id/:limit/:offset', (req, res, next) => {
	async.parallel([
		//get the comments
		(done) => {
			ArticleCommentModel.getCommentsByAuthor(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), done);
		},
		//get the total number of comments
		(done) => {
			ArticleCommentModel.getTotalCommentsByAuthor(req.params.id, done);
		}
	], (err, results) => {
		if (err) {
			return next(err);
		}

		res.json({
			comments: results[0],
			total: results[1]
		});
	});
});

module.exports = router;
