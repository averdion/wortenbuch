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

    getWords(userId,text,end, numwords,page){
        var that = this;

        var words = new Words();
        return words.searchWords(userId, text, end, numwords, page).then(function(wordlist) {
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
                            userId: word.userId
                        };           
                    })
                }
            };
        });
    }

    countWords(userId, text, translate, lang, type){
        var that = this;

        var words = new Words();
        return words.countWords(userId, text, translate, lang, type).then(function(result) {
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

    getOpenWord(userId){
        var that = this;

        var words = new Words();
        return words.find({userId: userId, end:0}).then(function(wordlist) {
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
                            userId: word.userId
                        };           
                    })
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
        return words.find({text: word.text, lang: word.lang}).then(function(wordlist) {
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
                            userId: word.userId
                                }         
                            })
                        }
                    };
                });
            }
        });
    }

    clockIn(userId, extratime, maxtime, loggeduser){
        var words = new Words();
        var users = new Users();
        var that = this;
        return words.find({userId: userId, end: 0}).then(function(wordlist){
            var word = { userId : userId};
            if(wordlist.length>0)
                word = wordlist[0];
            var date = new Date(parseInt(word.start));
            var daygroup = date.getFullYear().toString() + (date.getMonth()+101).toString().substr(1,2) + (date.getDate()+100).toString().substr(1,2);
            return words.find({userId: userId, daygroup: daygroup, parentId: null}).then(function(wordparentlist){
                if(wordparentlist.length>0 && wordparentlist[0].wordId != word.wordId)
                    word.parentId = wordparentlist[0].wordId;
                return users.find({userId: userId}).then(function(userlist){
                    var extratime = 0;
                    if(userlist[0].extratime!=0){
                        if(!word.parentId)
                          extratime = userlist[0].extratime;
                    }
                    var maxtime = userlist[0].maxtime * 3600000;
                    return words.clockIn(word, extratime, maxtime).then(function(words) {
                            var date = new Date();
                            var action = ( (words[0].end) ? 'clockout' : 'clockin');
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
                                        start: word.start,
                                        end: word.end,
                                        sum: word.sum,
                                        userId: word.userId,
                                        daygroup: word.daygroup,
                                        state: word.state
                                    }         
                                })
                            }
                        };
                    });
                });
            });
        });
    }

    autoLogin(userId){
        var words = new Words();
        var users = new Users();
        var that = this;
        var word = { userId : userId };
        return words.find({userId: userId, end: 0}).then(function(wordlist){
            var word = { userId : userId};
            if(wordlist.length>0)
                word = wordlist[0];
            var date = new Date(parseInt(word.start));
            var daygroup = date.getFullYear().toString() + (date.getMonth()+101).toString().substr(1,2) + (date.getDate()+100).toString().substr(1,2);
            return words.find({userId: userId, daygroup: daygroup, parentId: null}).then(function(wordparentlist){
                if(wordparentlist.length>0 && wordparentlist[0].wordId != word.wordId)
                    word.parentId = wordparentlist[0].wordId;
                
                return users.find({userId: userId, autologin: 1}).then(function(userlist){
                    var user = { userId : userId };
                    var extratime = 0;
                    if(userlist.length>0){
                        if(userlist[0].extratime!=0){
                            if(!word.parentId)
                                extratime = userlist[0].extratime;
                        }
                        var maxtime = userlist[0].maxtime * 3600000;
                        return words.clockIn(word, extratime, maxtime).then(function(words) {
                           var date = new Date();
                           var action = ( words[0].end ? 'autoclockout' : 'autoclockin');
                           
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
                                            start: word.start,
                                            end: word.end,
                                            sum: word.sum,
                                            userId: word.userId,
                                            daygroup: word.daygroup,
                                            state: word.state
                                        }         
                                    })
                                }
                            };
                        });

                    }else{
                        return {
                            links: {
                                self: '/api/auth/autologin', 
                                curies: that.response.getCuries(),
                            },
                            message: 'autologin not allowed'
                        };
                    }
                });
            });

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