var config = require('config');
class Response{
    constructor(){
    }

    send(res, hal,status){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.set('Content-Type', 'application/hal+json');
        res.set('Cache-Control', 'public, max-age=' + config.auth.maxAge);
        res.hal(hal);
    }

    getCuries(){
        return [
            {
                name: "rl",
                href: "http://jucadent.com/rels/{rel}",
                templated: true
            }
        ]; 
   }

    urilize(uri){
        return uri.toLowerCase().replace(' ', '_').replace("'", ".");
    }
}
module.exports = Response;