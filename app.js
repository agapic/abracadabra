var core = require('./bin/heart.js');
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('./routes/routes');
var champs = require('./data/champNames');
var fs = require('fs');
var async = require('async');


var regions = ['BR','EUNE','EUW','KR','LAN','LAS','NA','OCE','RU','TR'];  
//region = regions[0];

//config
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '/views'));
app.set('view options', {layout: 'layout'});

app.use(express.static(__dirname + '/public'));


function queryAllBefore(){
   core.queryAllBefore(function(data) {
        fs.writeFile('./bin/stats/beforeAggregate.json', JSON.stringify(data));
   })
}

function queryAllAfter(){
   core.queryAllAfter(function(data) {
        fs.writeFile('./bin/stats/afterAggregate.json', JSON.stringify(data));
   })
}


function createMagicDamageBeforeFile(){
   core.queryMagicDamage("magicDamageBefore", function(data) {
        fs.writeFile('./bin/stats/getMagicBefore.json', JSON.stringify(data));
   })

}

function createMagicDamageAfterFile(){
   core.queryMagicDamage("magicDamageAfter", function(data) {
        fs.writeFile('./bin/stats/getMagicAfter.json', JSON.stringify(data));
   })

}

function createMagicDamageBeforeFileBR(region){
   core.queryMagicDamage("magicDamageBefore"+region, function(data) {
        fs.writeFile('./bin/stats/getMagicBefore'+region+'.json', JSON.stringify(data));
   })
}


//AFTER

function createMagicDamageAfterFile(region){
   core.queryMagicDamage(region, "damageByRegionAfter", function(data) {
       console.log("CALLBACK :" + data);
        fs.writeFile('./bin/stats/getMagicAfter'+region+'.json', JSON.stringify(data));
   })
}

async.series([
    function(callback){
        callback(null, queryAllBefore());
    },
        function(callback){
        callback(null, queryAllAfter());
    },
    function(callback){
        callback(null, getItemDataBefore());
    }
    ],
        function(err, results){
    console.log(results);
})

function getMagicDamageByAllRegions(){            
for(i = 0; i < 1; i++){
    createMagicDamageBeforeFile(regions[i])
    createMagicDamageAfterFile(regions[i])
}
}

function getItemDataBefore(){
 
    

    




//Routes
app.get('/', routes.index);
app.get('/damage', routes.damage);
app.get('/damage/:region', routes.damage);
        
//Listen to dat port
app.listen(3002, function(){
    //console.log("listening");
});
    
    
