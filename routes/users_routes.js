var express = require('express');
var Api = require('../api/api.js');
var Response = require('../utils/response.js');
var Authentication = require('../authentication/session.js');
var router = express.Router();
const md5 = require('md5');
var response = new Response();
var authentication = new Authentication();

router.get('/api/users', function(req, res){
	api = new Api();
    api.getUsers()
		.then(response.send.bind(null,res)).done();
});

router.get('/api/users/delete', authentication.sessionChecker, function(req, res){
	api = new Api();
	var userId = req.query.userId;
    api.deleteUser(userId)
		.then(response.send.bind(null,res)).done();
});

router.get('/api/users/save', authentication.sessionChecker, function(req, res){
	var userId = (req.query.userId ? req.query.userId : false);
	var name = (req.query.name ? req.query.name : (Data.getTime()/1000));
	var email = (req.query.email ? req.query.email: 'no email');
	var imageurl = (req.query.type==4 ? 'admin.png': 'employee.png');
	var password = md5(req.query.password);
	var username = (name.replace(' ', '-').toLowerCase());
	var type = (req.query.type ? req.query.type : 0);
	var autologin = ((req.query.autologin=='false') ? 0 : 1);
	var extratime = ((req.query.extratime) ? req.query.extratime : 0);
	var maxtime = ((req.query.maxtime) ? req.query.maxtime : 8);
    var user = {
    	'userId': userId,
    	'name': name,
    	'email': email,
    	'imageurl': imageurl,
    	'password': password,
    	'username': username,
    	'type': type
    }
	api = new Api();
    api.saveUser(user)
		.then(response.send.bind(null,res)).done();
});

module.exports = router;