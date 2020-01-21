const express = require('express');
const fs = require('fs');
const path = require('path');
const async = require('async');

const router = express.Router();
const multipart = require('connect-multiparty');

const Validator = require('../../middleware/validator');
const Files = require('../../middleware/files');
const ArticleModel = require('../../models/article');
const ArticleViewModel = require('../../models/article-view');

const rules = {
	create: {
		categoryId: ['in(1, 2, 3, 4, 5)'], //category id's
		title: ['required', 'min-3', 'max-200'],
		summary: ['required', 'min-3', 'max-500'],
		content: ['required', 'min-50', 'max-10000'],
		image: ['required', 'valid-article-image']
	}
};

//get the latest articles from the specified author/user id
router.get('/author/:id/:limit/:offset', (req, res, next) => {
	async.parallel([
		//get the comments
		(done) => {
			ArticleModel.getByAuthor(req.params.id, parseInt(req.params.limit), parseInt(req.params.offset), done);
		},
		//get the total number of comments
		(done) => {
			ArticleModel.getTotalByAuthor((req.params.id), done);
		}
	], (err, results) => {
		if (err) {
			return next(err);
		}

		res.json({
			articles: results[0],
			total: results[1]
		});
	});
});

//get all articles from the specified category and/or search term
router.get('/category/:category/:searchTerm/:limit/:offset', (req, res, next) => {
	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), parseInt(req.params.offset), (err, results) => {
		if (err) {
			return next(err);
		}

		res.json(results);
	});
});

//get all article search suggestions from the specified category and search term
router.get('/autocomplete/:category/:searchTerm/:limit', (req, res, next) => {
	const textLimit = 80;

	ArticleModel.search(req.params.category, req.params.searchTerm, parseInt(req.params.limit), 0, (err, results) => {
		if (err) {
			return next(err);
		}

		//find out if the match was in the article title or the article content and return only that relevant part of the string
		const matched = results.map((article) => {
			let result = '';
			const { title } = article;
			const { content } = article;

			const titleIndex = title.toLowerCase().indexOf(req.params.searchTerm.toLowerCase());
			const contentIndex = content.toLowerCase().indexOf(req.params.searchTerm.toLowerCase());

			if (titleIndex !== -1) {
				result = title.substr(titleIndex, req.params.searchTerm.length + textLimit);
			} else if (contentIndex !== -1) {
				result = content.substr(contentIndex, req.params.searchTerm.length + textLimit);
			}

			//remove any HTML tags and dots that might appear at the end of the string
			result = result.replace(/<\/?\w+.+/ig, '');
			result = result.replace(/\.$/, '');

			return result;
		});

		res.json(matched);
	});
});

//get the most popular articles for the specified period
router.get('/popular/:period/:limit', (req, res, next) => {
	ArticleModel.getMostPopular(req.params.period, parseInt(req.params.limit), (err, results) => {
		if (err) {
			return next(err);
		}

		res.json(results);
	});
});

//get the article that matches the specified id and increments the views counter
router.get('/:id', (req, res, next) => {
	const articleId = parseInt(req.params.id);

	ArticleModel.getById(articleId, (err, result) => {
		if (err) {
			return next(err);
		}

		if (result) {
			const userId = req.session.user ? req.session.user.id : null;
			ArticleViewModel.addArticleView(articleId, userId);
		}

		res.json(result);
	});
});

//create new article record
router.post('/', multipart(), Validator.validate(rules.create), Files.uploadArticleImage, (req, res, next) => {
	const data = req.body;

	//create the new article
	ArticleModel.create(data.categoryId, data.title, data.summary, data.content, req.files.image.uploadedTo, req.session.user.id, (err, articleInstance) => {
		if (err) {
			return next(err);
		}

		res.json({
			article: articleInstance
		});
	});
});

//delete article
router.delete('/:id', (req, res, next) => {
	const config = req.app.get('config');

	const articleId = parseInt(req.params.id);

	ArticleModel.getById(articleId, (err, article) => {
		if (err) {
			return next(err);
		}

		//unexisting article
		if (!article) {
			return res.json({
				errors: {
					article: 'Invalid article id'
				}
			});
		}

		//article that doesn't belong to the current user
		if (article.authorId !== req.session.user.id) {
			return res.json({
				errors: {
					article: 'Permissions denied'
				}
			});
		}

		ArticleModel.delete(articleId, (deleteErr) => {
			if (deleteErr) {
				return next(deleteErr);
			}

			let image = path.join(__dirname, '../../', config.uploads.articles.directory, article.image);
			//remove all GET parameters from the path (if any)
			image = image.replace(/\?.+/, '');

			//delete the article image
			fs.unlink(image, (unlinkErr) => {
				if (unlinkErr) {
					return next(unlinkErr);
				}

				res.json({
					status: true
				});
			});
		});
	});
});

module.exports = router;
