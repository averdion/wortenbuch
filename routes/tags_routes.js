var express = require('express');
var Api = require('../api/api.js');
var router = express.Router();
var Response = require('../utils/response.js');
var Authentication = require('../authentication/session.js');
var response = new Response();
var authentication = new Authentication();

router.get('/api/tags?', authentication.sessionChecker, function(req, res){
	var api = new Api();
	var userId = '';
	if(!userId)
		userId = '';
	var text = req.query.text || '';
	var lang = req.query.lang || '';
	var numtags = req.query.numtags || 30;
	var page = req.query.page || -1;
    api.getTags(text, lang, userId, numtags, page)
		.then(response.send.bind(null,res)).done();
});

router.get('/api/tags/counttags?', authentication.sessionChecker, function(req, res){
	var api = new Api();
	var userId = req.query.userId;
	if(!userId)
		userId = req.session.user.userId || 0;
	var text = req.query.text || '';
	var lang = req.query.lang || '';

    api.countTags(userId, text, lang)
		.then(response.send.bind(null,res)).done();
});

module.exports = router;