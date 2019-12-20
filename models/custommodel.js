const filters = require('../utils/filters');
var db = require('../utils/db');

class customModel{

    constructor(tablename) {
        this.tablename = tablename;
        this.db = db;
    }

    applyFilter(field, operator, value) {
        if (operator == filters.operators.EQUALS) {
            this._query = this._query.where(field, value);
        }
        if (operator == filters.operators.IN && value) {
            this._query = this._query.whereIn(field, value);
        }
        if (operator == filters.operators.CONTAINS && value){
            this._query = this._query.where(field, 'ilike', '%'+value+'%');
        }
        if (operator == filters.operators.START_WITH && value){
            this._query = this._query.where(field, 'ilike', value+'%');
        }
        return this;
    }

    find(values){
        return this.db(this.tablename)
            .where(values)
            .then(function(results){
                if(results.length !== 1)
                    return [];
                return results;
        });
    }

    select(columns){
        this._query = this._query.select(columns);
        return this;
    }

    order(column, direction){
        this._query = this._query.orderBy(column, direction);
        return this;
    }

    execute() {
        return this._query.then(
            function(rows){
                this._query = this.db(this.tablename);
                return rows;
            }.bind(this), 
            function(err){
                return err;
            });
    }

    delete(values){
        return this.db(this.tablename)
            .where(values)
            .del();
    }

}
module.exports = customModel;