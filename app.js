var core = require('./bin/heart.js');
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('./routes/routes');
var champs = require('./data/champNames');
var fs = require('fs');


var regions = ['BR','EUNE','EUW','KR','LAN','LAS','NA','OCE','RU','TR'];  
region = regions[0];

//config
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '/views'));
app.set('view options', {layout: 'layout'});

app.use(express.static(__dirname + '/public'));



function createMagicDamageBeforeFile(){
   core.queryMagicDamage("magicDamageBefore", function(data) {
        fs.writeFile('./bin/stats/getMagicBefore.json', JSON.stringify(data));
   })

}1

function createMagicDamageAfterFile(){
   core.queryMagicDamage("magicDamageAfter", function(data) {
        fs.writeFile('./bin/stats/getMagicAfter.json', JSON.stringify(data));
   })

}
/*
function createMagicDamageBeforeFileBR(){
   core.queryMagicDamage("magicDamageBefore"+region, function(data) {
        fs.writeFile('./stats/getMagicBefore'+region+'.json', JSON.stringify(data));
   })
}


//AFTER

function createMagicDamageAfterFileBR(){
   core.queryMagicDamage("magicDamageAfter"+region, function(data) {
        fs.writeFile('./stats/getMagicAfter'+region+'.json', JSON.stringify(data));
   })
}
*/

            

//createMagicDamageAfterFileBR();
//createMagicDamageBeforeFile();
//createMagicDamageAfterFile();


   



//Routes
app.get('/', routes.index);
app.get('/damage', routes.damage);
app.get('/damage/:region', routes.damage);
        
//Listen to dat port
app.listen(3002, function(){
    //console.log("listening");
});
