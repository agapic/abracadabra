var pg = require('pg');
var fs = require('fs');
var handlebars = require('handlebars');
var fileConnector = require('../data/connection.js');
var connectionString = fileConnector.connection;

var client = new pg.Client(connectionString);
client.connect();

var self = function(){
    return this;
};


self.queryAll = function (callback) {
    var query = client.query('select * from match', function(err, result){
        callback(result.rows);   
    });
    query.on('end', client.end.bind(client)); 
}


self.queryByChamp = function (champName, callback) {

    var query = client.query('select SUM(magicdamagedealttochampions) from match where \''+champName+'\' IN (champname) AND matchversion=\'5.14\'', function(err, result){

        callback(result.rows[0]);
    })
    query.on('end', client.end.bind(client));

}
    


module.exports = self


