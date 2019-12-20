const customModel = require('./custommodel.js');

class Words extends customModel{

    constructor(){
    	super('words');
    }

    searchWords(userId, text, translate, lang, type, numwords, page){
        var db = this.db(this.tablename)
        if(userId>0)
            db.where('userId', userId)
        if(text!='')
            db.andWhere('text', 'like', '%' + text + '%');
        if(translate!='')
            db.andWhere('translate', '!=', translate);
        if(lang!='')
            db.andWhere('lang', '=', lang);
        if(type!='')
            db.andWhere('type', '=', type);
        if(numwords>0){
            db.limit(numwords);
            if(page> -1){
                db.offset(page*numwords)
            }
        }

        return db.orderBy('text', 'DESC');
    }

    countWords(userId, text, translate, lang, type){
        var db = this.db(this.tablename)
        if(userId>0)
            db.where('userId', userId)
        if(text!='')
            db.andWhere('text', '%', text);
        if(translate!='')
            db.andWhere('translate', '!=', translate);
        if(lang!='')
            db.andWhere('lang', '=', lang);
        if(type!='')
            db.andWhere('type', '=', type);

        return db.count('wordId', {as: 'numresults'});
    }

    save(word){
        if(word.wordId){
            return this.db(this.tablename)
                .where('wordId','=', word.wordId)
                .update({
                        wordId: word.wordId,
                        text: word.text,
                        translation: word.translation,
                        lang: word.lang,
                        type: word.type,
                        userId: word.userId,
                        })
                .then(function(rows){
                    return [word]; 
            });
        }else{
            return this.db(this.tablename)
                .insert({
                        text: word.text,
                        translation: word.translation,
                        lang: word.lang,
                        type: word.type,
                        userId: word.userId,
                        })
                .into(this.tablename)
                .then(function(rows){
                    return [word];
            });
        }
    }

}

module.exports = Words;