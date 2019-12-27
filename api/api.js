var Users = require ('../models/users.js');
var Words = require('../models/words.js');
var Tags = require('../models/tags.js');
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

    getWords(userId, text, translate, lang, type, tags, numwords, page){
        var that = this;
        var words = new Words();
        var taglist = tags.split(',');
        return words.searchWords(userId, text, translate, lang, type, taglist, numwords, page).then(function(wordlist) {
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
                            tags: word.tags,
                            userId: word.userId
                        };           
                    })
                }
            };
        });
    }

    countWords(userId, text, translate, lang, type, tags){
        var that = this;
        var taglist = tags.split(',');
        var words = new Words();
        return words.countWords(userId, text, translate, lang, type, taglist).then(function(result) {
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
                    that.saveTags(word.tags, word.lang, word.userId);
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
                            tags: word.tags,
                            userId: word.userId
                                }         
                            })
                        }
                    };
                });
            }
        });
    }

    saveTags(strtags,lang, userId){
        var tags = new Tags();
        var that = this;
        var taglist = strtags.split(',');
            taglist.forEach(function(item, index){
                tags.countTags(item.trim(), lang, userId).then(function(result){
                    if(result[0]['numresults']==0)
                        tags.save({text: item.trim(), lang: lang, userId: userId}).done();

                });
            });

    }

    getUsers(){
        var users = new Users();
        var that = this;
        return users.getUsers().then(function(items) {
           return {
               links: {
                    self: '/api/users', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:entries": items.map(function(user){
                       return {
                            links: {
                                self: '/api/users/' + user.userId 
                            },
                            userId: user.userId,
                            name: user.name,
                            email: user.email,
                            imageurl: user.imageurl,
                            username: user.username,
                            type: user.type
                        };           
                    })
                }
            };
        });
    }

    getTags(text, lang, userId, numtags, page){
        var tags = new Tags();
        var that = this;
        return tags.searchTags(text, lang, userId, numtags, page).then(function(items) {
           return {
               links: {
                    self: '/api/tags', 
                    curies: that.response.getCuries(),
                },
                embeds: {
                   "rl:entries": items.map(function(tag){
                       return {
                            links: {
                                self: '/api/tags/' + tag.tagId 
                            },
                        tagId: tag.tagId,
                        text: tag.text,
                        lang: tag.lang,
                        userId: tag.userId,
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