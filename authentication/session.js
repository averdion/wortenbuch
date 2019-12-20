var Response = require('../utils/response.js');

class Authentication{
    constructor(){
    	this.response = new Response();
    }

    sessionChecker(req, res, next){;
        if (!req.session.user) {
            res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(403).json({ message: 'authentication denied' }).end();
        } else {
            next();
        }
    }
    sessionCheckerStatic(req, res, next){;
        if (!req.session.user) {
            res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.redirect("/");
        } else {
            next();
        }
    }
}
module.exports = Authentication;