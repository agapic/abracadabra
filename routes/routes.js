var core = require('../bin/heart.js');
var fileBefore;
var fileAfter;
var hbs = require('hbs');
var fs = require('fs');
var ejs = require('ejs');


hbs.registerPartial('header', fs.readFileSync('./views/partials/header.hbs', 'utf8'));

hbs.registerPartial('damageData', fs.readFileSync('./views/partials/damage.hbs', 'utf8'));
hbs.registerPartials(__dirname + '../views/partials/');


exports.index = function(req, res){
    res.render('layout');
}

exports.damageHome = function(req, res){
    res.render('damageHome', {layout: 'damageHome'});
}

exports.damage = function(req, res){
    if(req.params.region){
    regions=req.params.region;
    }
    else{
        regions='';
    }
    magicBefore = require('../bin/stats/getMagicBefore'+regions+'.json');
    magicAfter = require('../bin/stats/getMagicAfter'+regions+'.json');
    gamesBefore = require('../bin/stats/getChampGamesBefore'+regions+'.json');
    gamesAfter = require('../bin/stats/getChampGamesAfter'+regions+'.json');
    

    
    var champDataLength = magicBefore.length;
    if(magicBefore.length > magicAfter.length){
        champDataLength = magicAfter.length;
    }

        
    
    var champDamageData = [];
    for(i = 0; i < champDataLength; i++) {
        var elementNum = magicBefore[i];
        elementNum["afterSum"] = magicAfter[i].sum;

        elementNum["gamesBefore"] = gamesBefore[i].count;
                if(magicAfter[i].champname == gamesAfter[i].champname){
        elementNum["gamesAfter"] = gamesAfter[i].count;
                }
        elementNum["damageDifference"] = parseFloat(((magicAfter[i].sum - magicBefore[i].sum) / magicBefore[i].sum)*100).toFixed(2);
        
        elementNum["damagePerGameBefore"] = parseFloat(elementNum["sum"] / elementNum["gamesBefore"]).toFixed(0);
        elementNum["damagePerGameAfter"] = parseFloat(elementNum["afterSum"] / elementNum["gamesAfter"]).toFixed(0);
        
        champDamageData.push(magicBefore[i]);      
    }
    
 
    
    res.locals = {champDamageData: champDamageData}
    res.render('partials/damage', {layout: 'damageHome'});
}

    

