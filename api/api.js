var Users = require ('../models/users.js');
var Words = require('../models/words.js');
var config = require('config');
var rp = require('request-promise');
var Response = require('../utils/response.js');
var DEFAULT_PAGE_SIZE = 60;
var DEFAULT_PAGE = 1;

class Api{

	constructor(){
		this.response = new Response();
	}

    static word(){
        return {
            links: {
                self: '/api/entries',
                curies: [
                    {
                        name: "rl",
                        href: "http://refly.xyz/rels/{rel}",
                        templated: true
                    }
                ],
                "rl:entries": { href: "/api/entries?{user,dateini,datefin}", templated: true },}
            }
        }

    getWords(userId, text, translate, lang, type, categories, numwords, page){
        var that = this;
        var words = new Words();
        return words.searchWords(userId, text, translate, lang, type, categories, numwords, page).then(function(wordlist) {
           return {
               links: {
                    self: '/api/entries', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:entries": wordlist.map(function(word){
                       return {
                            links: {
                                self: '/api/words/' + word.wordId 
                            },
                            wordId: word.wordId,
                            text: word.text,
                            translation: word.translation,
                            lang: word.lang,
                            type: word.type,
                            categories: word.categories,
                            userId: word.userId
                        };           
                    })
                }
            };
        });
    }

    countWords(userId, text, translate, lang, type, categories){
        var that = this;

        var words = new Words();
        return words.countWords(userId, text, translate, lang, type, categories).then(function(result) {
           return {
               links: {
                    self: '/api/entries', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:results": result
                }
            };
        });
    }

    deleteWord(wordId, loggeduser){
        var that = this;
        var words = new Words();
        return words.delete({wordId: wordId}).then(function(result) {
           var date = new Date();
           return {
               links: {
                    self: '/api/words/delete', 
                    curies: that.response.getCuries(),
                },
                message: 'entrada borrado'
            }
        });
    }
    saveWord(word, loggeduser){
        var words = new Words();
        var that = this;
        return words.find({userId: loggeduser.userId, text: word.text, lang: word.lang}).then(function(wordlist) {
            if(wordlist.length==0){
                return words.save(word).then(function(words) {
                    var date = new Date();
                    var action = ( word.wordId ? 'modified word' : 'added word');
                    return {
                       links: {
                            self: '/api/entries', 
                            curies: that.response.getCuries(),
                        },
                        embeds: {
                            "rl:entries": words.map(function(word){
                                return {
                                    links: {
                                        self: '/api/words/' + word.wordId 
                                    },
                            wordId: word.wordId,
                            text: word.text,
                            translation: word.translation,
                            lang: word.lang,
                            type: word.type,
                            categories: word.categories,
                            userId: word.userId
                                }         
                            })
                        }
                    };
                });
            }
        });
    }

    getUsers(){
        var users = new Users();
        var that = this;
        return users.getUsers().then(function(words) {
           return {
               links: {
                    self: '/api/users', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:entries": words.map(function(user){
                       return {
                            links: {
                                self: '/api/users/' + user.userId 
                            },
                            userId: user.userId,
                            name: user.name,
                            email: user.email,
                            imageurl: user.imageurl,
                            username: user.username,
                            type: user.type,
                            autologin: user.autologin,
                            logged: user.logged,
                            extratime: user.extratime,
                            maxtime: user.maxtime
                        };           
                    })
                }
            };
        });
    }

    saveUser(user){
        var users = new Users();
        var that = this;
        return users.save(user).then(function(words) {
           return {
               links: {
                    self: '/api/users/save', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:entries": words.map(function(user){
                       return {
                            links: {
                                self: '/api/users/' + user.userId 
                            },
                            userId: user.userId,
                            name: user.name,
                            email: user.email,
                            imageurl: user.imageurl,
                            username: user.username,
                            type: user.type,
                            autologin: user.autologin,
                            extratime: user.extratime,
                            maxtime: user.maxtime
                        };           
                    })
                }
            };
        });
    }

    deleteUser(userId){
        var users = new Users();
        var that = this;
        return users.delete({userId: userId}).then(function(result) {
           return {
               links: {
                    self: '/api/users/delete', 
                    curies: that.response.getCuries(),
                },
                message: 'usuario borrado'
            };
        });
    }

    getLoggedUser(user){
        var that = this;
        return {
            links: {
                self: '/api/users', 
                    curies: that.response.getCuries(),
                },
            embeds: {
                "rl:entries": 
                {
                    links: {
                        self: '/api/users/' + user.userId 
                    },
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    imageurl: user.imageurl,
                    username: user.username,
                    type: user.type,
                    autologin: user.autologin,
                    extratime: user.extratime,
                    maxtime: user.maxtime
                }          
            }
        };
    }
}

module.exports = Api;