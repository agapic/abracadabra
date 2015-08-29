var pg = require('pg');
var fs = require('fs');
var handlebars = require('handlebars');
var fileConnector = require('../data/connection.js');
var connectionString = fileConnector.connection;

var deasync = require('deasync')

var client = new pg.Client(connectionString);
client.connect();

var self = function(){
    return this;
};

self.queryAllBefore = function (callback) {
    console.log("BEFORE");
    var query = client.query("select * from match where matchversion=\'5.11\'", function(err, result){         
        callback(result.rows); 

    });
            query.on('end', client.end.bind(client)); 
}

self.queryAllAfter = function (callback) {
    console.log("AFTER");
    var query = client.query("select * from match where matchversion=\'5.14\'", function(err, result){
        callback(result.rows);   

    });
    query.on('end', client.end.bind(client)); 
}


self.queryMagicDamage = function (region, context, callback) {
    if(context==="magicDamageBefore"){
    var query = client.query('select champname, SUM(magicdamagedealttochampions) from match where matchversion=\'5.11\' GROUP BY champname ORDER BY champname ASC', function(err, result){
            callback(result.rows);
    })
    query.on('end', client.end.bind(client));

    }
    
        if(context==="magicDamageAfter"){
    var query = client.query('select champname, SUM(magicdamagedealttochampions) from match where matchversion=\'5.14\' GROUP BY champname ORDER BY champname ASC', function(err, result){
            callback(result.rows);
    })
    query.on('end', client.end.bind(client));

    }
    

    
            else if(context==="damageByRegionAfter"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region IN ($1) GROUP BY champname,region ORDER BY champname ASC', [region], function(err, result){
            callback(result.rows);
    });


    }

    
}


    


module.exports = self


