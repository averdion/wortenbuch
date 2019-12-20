var express = require('express');
var router = express.Router();
var Authentication = require('../authentication/session.js');
var path = require('path');
var authentication = new Authentication();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../vue-app/dist/','index.html'));
});
router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname,'../vue-app/dist/','index.html'));
});
router.get('/entries', authentication.sessionCheckerStatic, function(req, res) {
    res.sendFile(path.join(__dirname,'../vue-app/dist/','index.html'));
});
router.get('/users', authentication.sessionCheckerStatic, function(req, res) {
    res.sendFile(path.join(__dirname,'../vue-app/dist/','index.html'));
});
router.get('/clockin', authentication.sessionCheckerStatic, function(req, res) {
    res.sendFile(path.join(__dirname,'../vue-app/dist/','index.html'));
});

module.exports = router;