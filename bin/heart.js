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

self.queryAllBefore = function (callback) {
    var query = client.query("select * from match where matchversion=\'5.14\'", function(err, result){         
        callback(result.rows);   
    });
    query.on('end', client.end.bind(client)); 
}

self.queryAllAfter = function (callback) {
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
    }
    
        if(context==="magicDamageAfter"){
    var query = client.query('select champname, SUM(magicdamagedealttochampions) from match where matchversion=\'5.14\' GROUP BY champname ORDER BY champname ASC', function(err, result){
            callback(result.rows);
    })
    }
    
    //BEFORE
            if(context==="damageByRegionBefore"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'BR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
    
    ////AFTER
    
                if(context==="damageByRegionAfter"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region IN ($1) GROUP BY champname,region ORDER BY champname ASC', [region], function(err, result){
        console.log("BR: " +result.rows);
            callback(result.rows);
    })
    }
    
    
    
    query.on('end', client.end.bind(client));

}


    


module.exports = self


