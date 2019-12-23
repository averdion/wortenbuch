var express = require('express');
var Api = require('../api/api.js');
var router = express.Router();
var Response = require('../utils/response.js');
var Authentication = require('../authentication/session.js');
var response = new Response();
var authentication = new Authentication();

router.get('/api/words?', authentication.sessionChecker, function(req, res){
	var api = new Api();
	var userId = req.query.userId;
	if(!userId)
		userId = req.session.user.userId || 0;
	var text = req.query.text || '';
	var translate = req.query.translate || '';
	var lang = req.query.lang || '';
	var type = req.query.type || '';
	var tags = req.query.tags || '';
	var numwords = req.query.numwords || 0;
	var page = req.query.page || -1;
    api.getWords(userId, text, translate, lang, type, tags, numwords, page)
		.then(response.send.bind(null,res)).done();
});

router.get('/api/words/countwords?', authentication.sessionChecker, function(req, res){
	var api = new Api();
	var userId = req.query.userId;
	if(!userId)
		userId = req.session.user.userId || 0;
	var text = req.query.text || '';
	var translate = req.query.translate || '';
	var lang = req.query.lang || '';
	var type = req.query.type || '';
	var tags = req.query.tags || '';

    api.countWords(userId, text, translate, lang, type, tags)
		.then(response.send.bind(null,res)).done();
});


router.get('/api/words/save', authentication.sessionChecker, function(req, res){
	try{
	    var api = new Api();
	    var userId = req.session.user.userId;
		var word = {
		    wordId: req.query.wordId || 0,
		    text: req.query.text || '',
		    translation: req.query.translation || '',
		    type: req.query.type || '',
		    tags: req.query.tags || '',
		    lang: req.query.lang || 'de',
		    userId: req.query.userId,
		};
        api.saveWord(word, req.session.user)
			    .then(response.send.bind(null,res)).done();
	}catch(err){
        res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Credentials", true);
    	res.status(403).json({ message: 'dates incorrect' });
	}
});

//explain the api
router.get('/api/words/delete', authentication.sessionChecker, function(req, res){
	api = new Api();
	var wordId = req.query.wordId;
    api.deleteWord(wordId, req.session.user)
		.then(response.send.bind(null,res)).done();
});

module.exports = router;