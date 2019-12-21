const customModel = require('./custommodel.js');


class Users extends customModel{
    
    constructor(){
    	super('users');
    }


    getUsers(){
        return this.db(this.tablename)
        .select('users.userId', 'users.name', 'users.email', 'users.imageurl', 'users.username', 'users.type', 'users.password').orderBy('userId', 'ASC');
    }

    save(user){
        if(user.userId){
        	var fieldstoupdate = {
                name: user.name,
                email: user.email,
                username: user.username,
                type: user.type
            }
            if(user.password!='@@nopassword@@')
                fieldstoupdate['password'] = user.password;
            return this.db(this.tablename)
                .where('userId','=', user.userId)
                .update(fieldstoupdate)
                .then(function(rows){
                    return [user]; 
            });
        }else{
            return this.db(this.tablename)
                .insert({
	                name: user.name,
	                email: user.email,
                    imageurl: user.imageurl,
	                username: user.username,
	                password: user.password,
	                type: user.type
                        })
                .into(this.tablename)
                .then(function(rows){
                    return [user];
            });
        }
    }
}
module.exports = Users;