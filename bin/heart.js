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

//Get ranked magic damage in total prior to match
self.getRankedMagicDamageBeforePatch = function (callback) {
    var query = client.query('select * from match', function(err, result){
        callback(result.rows);   
    });
    query.on('end', client.end.bind(client)); 
}

//Get ranked magic damage in total after patch
self.getRankedMagicDamageAfterPatch = function(callback) {
    query = client.query('select SUM(magicdamagedealttochampions) from match where matchversion=\'5.14\'', function(err, result){
        callback(result.rows[0]);    
    });
    query.on('end', function() { client.end(); });
}

self.getNormalMagicDamageBeforePatch = function(callback) {
    client.query('select SUM(magicdamagedealttochampions) from match', function(err, result){
        callback(result.rows[0]);    
    });
    query.on('end', function() { client.end(); });
}

module.exports = self


