var pg = require('pg');
var fs = require('fs');
var handlebars = require('handlebars');
var fileConnector = require('../data/connection.js');
var connectionString = fileConnector.connection;
var async = require('async');



var client = new pg.Client(connectionString);
client.connect();

var self = function(){
    return this;
};




self.queryAll = function (callback) {
    var query = client.query('select * from match where magicdamagedealttochampions>0', function(err, result){
        console.log(result);
        callback(result.rows);   
    });
    query.on('end', client.end.bind(client)); 
}


self.queryMagicDamage = function (context, callback) {
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
    
            if(context==="magicDamageBeforeBR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'BR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeEUNE"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'EUNE\' GROUP BY champname,region ORDER BY champname ASC;', function(err, result){
        console.log("EUNE: " + result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeEUW"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE region=\'EUW\' AND matchversion=\'5.11\' GROUP BY champname,region ORDER BY champname ASC;', function(err, result){
        console.log(query.text);
        console.log("EUW: " + result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeKR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'KR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log("KR : " + result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeLAN"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'LAN\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeLAS"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'LAS\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeNA"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'NA\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeOCE"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'OCE\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeRU"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'RU\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                if(context==="magicDamageBeforeTR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region=\'TR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
    ////AFTER
    
                if(context==="magicDamageAfterBR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'BR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterEUNE"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'EUNE\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterEUW"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'EUW\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterKR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'KR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterLAN"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'LAN\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterLAS"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'LAS\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterNA"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'NA\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterOCE"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'OCE\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterRU"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'RU\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
                    if(context==="magicDamageAfterTR"){
    var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region=\'TR\' GROUP BY champname,region ORDER BY champname ASC', function(err, result){
        console.log(result.rows);
            callback(result.rows);
    })
    }
    
    
    query.on('end', client.end.bind(client));

}


    


module.exports = self


