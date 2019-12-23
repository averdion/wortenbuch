const customModel = require('./custommodel.js');

class Tags extends customModel{

    constructor(){
    	super('tags');
    }

    searchTags(text, lang, userId, numtags, page){
        var db = this.db(this.tablename)
        db.where('tagId','>','0')
        if(text!='')
            db.andWhere('text', 'like', '%' + text + '%');
        if(lang!='')
            db.andWhere('lang', '=', lang);
        if(userId!='')
            db.andWhere('userId', '=', userId);
        if(numtags>0){
            db.limit(numtags);
            if(page> -1){
                db.offset(page*numtags)
            }
        }

        return db.orderBy('text', 'DESC');
    }

    countTags(text, lang, userId){
        var db = this.db(this.tablename)
        db.Where('tagId','>','0')
        if(text!='')
            db.andWhere('text', 'like', '%' + text + '%');
        if(lang!='')
            db.andWhere('lang', '=', lang);

        return db.count('tagId', {as: 'numresults'});
    }

    save(tag){
        if(tag.tagId){
            return this.db(this.tablename)
                .where('tagId','=', tag.tagId)
                .update({
                        tagId: tag.tagId,
                        text: tag.text,
                        lang: tag.lang,
                        userId: tag.userId,
                        })
                .then(function(rows){
                    return [tag]; 
            });
        }else{
            return this.db(this.tablename)
                .insert({
                        text: tag.text,
                        lang: tag.lang,
                        userId: tag.userId,
                        })
                .into(this.tablename)
                .then(function(rows){
                    return [tag];
            });
        }
    }

}

module.exports = Tags;