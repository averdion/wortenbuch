var express = require('express');
var Api = require('../api/api.js');
var Users = require ('../models/users.js');
var Authentication = require('../authentication/session.js');
var router = express.Router();
var config = require('config');
const md5 = require('md5');
var Response = require('../utils/response.js');
var Api = require('../api/api.js');
var authentication = new Authentication();
var response = new Response();

router.get('/api/auth/loggeduser',function(req, res){
    api = new Api();
    if(req.session && req.session.user){
        json = api.getLoggedUser(req.session.user);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.status(200).json(json);
    }else{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.status(403).json({ message: 'user not logged' });
    }
});
router.get('/api/auth/login',function(req, res){
    var username = req.query.username;
    var password = md5(req.query.password);
    var users = new Users();
    try {
    users.find({username: username, password: password}).then(function(users) {
        if(users.length>0){
    		req.session.user = users[0];
            var date = new Date();
            var api = new Api();
            var json = api.getLoggedUser(req.session.user);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
            res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    		res.status(202).json(json);
        }else{
            throw "access denied";
        }
    });
    }catch(err){
        console.log(err);
        res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Credentials", true);
        res.status(403).json({ message: 'authentication denied' });
    }
});

router.get('/api/auth/logout',function(req, res){
    if(req.session && req.session.user){
        var date = new Date();
        req.session = null;
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.status(200).json({message: 'Logout completado'});
});

router.get('/api/auth/autologin', function(req, res){
    api = new Api();
    var userId = req.query.userId;
    api.autoLogin(userId).then(response.send.bind(null,res)).done();
});
module.exports = router;