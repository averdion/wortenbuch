// framework modularized for node
var express = require('express');
var session = require('express-session');

//Adds a req/res.resource object for building your resource prior to res.hal
hal = require('express-hal');
var http = require('http');

config = require('config');

path = require('path');

var app = express();
var env = process.env.NODE_ENV || 'development';
env = 'development';
app.set('port', config.serverConfig.port);

if ('development' == env) {
}
app.set('port', config.serverConfig.port);
app.set('ipaddr', config.serverConfig.ip);

var static_routes = require('./routes/static_routes.js');
var words_routes = require('./routes/words_routes.js');
var users_routes = require('./routes/users_routes.js');
var authentication_routes = require('./routes/authentication_routes.js');

app.use(hal.middleware);//using hal JSON assembler
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    key: config.auth.user_sid,
    secret: config.auth.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: config.auth.expires,
    }
}));
app.use('/', express.static(path.join(__dirname, '/vue-app/dist')));
app.use(static_routes);
app.use(words_routes);
app.use(users_routes);
app.use(authentication_routes);

http.createServer(app).listen(config.serverConfig.port, app.get('ipaddr'), function(){
  console.log("Express server listening on port " + config.serverConfig.port);
});
