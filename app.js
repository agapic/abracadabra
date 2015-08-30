var core = require('./bin/heart.js');
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('./routes/routes');
var champs = require('./data/champNames');
var fs = require('fs');
var async = require('async');
var deasync = require('deasync');
var pg = require('pg');
var fileConnector = require('./data/connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);
client.connect();

var regions = ['BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR'];
//region = regions[0];

//config
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.set('view options', {layout: 'layout'});

app.use(express.static(__dirname + '/public'));


function queryAllBefore() {
   core.queryAllBefore(function(data) {
        fs.writeFileSync('./bin/stats/beforeAggregate.json', JSON.stringify(data));
       return;
   })
}

function queryAllAfter(){
   core.queryAllAfter(function(data) {
        fs.writeFileSync('./bin/stats/afterAggregate.json', JSON.stringify(data));
   return;
   })

}


function createOverallMagicDamageBeforeFile(){
   var query = client.query('select champname, SUM(magicdamagedealttochampions) from match where matchversion=\'5.11\' GROUP BY champname ORDER BY champname ASC', function(err, result){
                    fs.writeFile('./bin/stats/getMagicBefore.json', JSON.stringify(result.rows));

    })


   }

function createOverallMagicDamageAfterFile(){
   var query = client.query('select champname, SUM(magicdamagedealttochampions) from match where matchversion=\'5.14\' GROUP BY champname ORDER BY champname ASC', function(err, result){
                    fs.writeFile('./bin/stats/getMagicAfter.json', JSON.stringify(result.rows));

    })


}

function createMagicDamageBeforeFile(region, callback){

      var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.11\' AND region IN ($1) GROUP BY champname,region ORDER BY champname ASC',[region], function(err, result){
         fs.writeFile('./bin/stats/getMagicBefore'+region+'.json', JSON.stringify(result.rows));
        
    });


   }


function createMagicDamageAfterFile(region){
      var query = client.query('select champname,region, SUM(magicdamagedealttochampions) FROM match WHERE matchversion=\'5.14\' AND region IN ($1) GROUP BY champname,region ORDER BY champname ASC',[region], function(err, result){

         fs.writeFileSync('./bin/stats/getMagicAfter'+region+'.json', JSON.stringify(result.rows));
        
    });
}

function createChampGamesBeforeFile(){
      var query = client.query('select champname,count(champname) from match where matchversion = \'5.11\' group by champname order by champname asc', function(err, result){

         fs.writeFileSync('./bin/stats/getChampGamesBefore.json', JSON.stringify(result.rows));
        
    });
}

function createChampGamesAfterFile(){
      var query = client.query('select champname,count(champname) from match where matchversion = \'5.14\' group by champname order by champname asc', function(err, result){

         fs.writeFileSync('./bin/stats/getChampGamesAfter.json', JSON.stringify(result.rows));
        
    });
}


async.series([
    
    function(callback){
        callback(null, queryAllBefore());
    },
    function(callback){
        callback(null, queryAllAfter());
    },
    function(callback){     
        callback(null, createOverallMagicDamageBeforeFile());
    },
    function(callback){     
        callback(null, createOverallMagicDamageAfterFile());
    },
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[0]));
    },
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[1]));
    },
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[2]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[3]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[4]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[5]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[6]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[7]));
    },
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[8]));
    },    
    function(next){     
        next(null, createMagicDamageBeforeFile(regions[9]));
    }, 
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[0]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[1]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[2]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[3]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[4]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[5]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[6]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[7]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[8]));
    },
    function(callback){     
        callback(null, createMagicDamageAfterFile(regions[9]));
    },
    function(callback){     
        callback(null, createChampGamesBeforeFile());
    },
    function(callback){     
        callback(null, createChampGamesAfterFile());
    }
    
    
    
    


    ],
        function(err, results){
    console.log(results);
})

 
    
//Routes
app.get('/', routes.index);
app.get('/damage', routes.damage);
app.get('/damageHome', routes.damageHome);
app.get('/damage/:region', routes.damage);
        
//Listen to dat port
app.listen(3002, function(){
    //console.log("listening");
});
    
    
