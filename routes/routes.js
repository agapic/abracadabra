var core = require('../bin/heart.js');
var fileBefore;
var fileAfter;
var hbs = require('hbs');
var fs = require('fs');
var ejs = require('ejs');


hbs.registerPartial('header', fs.readFileSync('./views/partials/header.hbs', 'utf8'));
hbs.registerPartial('damageData', fs.readFileSync('./views/partials/damage.hbs', 'utf8'));
hbs.registerPartials(__dirname + '../views/partials/');
var blocks = {};


exports.index = function(req, res){
    res.render('layout');
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

    
    var champDataLength = magicBefore.length;
    if(magicBefore.length > magicAfter.length){
        champDataLength = magicAfter.length;
    }

        
    
    var champDamageData = [];
    for(i = 0; i < champDataLength; i++) {
        var elementNum = magicBefore[i];
        elementNum["afterSum"] = magicAfter[i].sum;   
        elementNum["difference"] = parseFloat(((magicAfter[i].sum - magicBefore[i].sum) / magicBefore[i].sum)*100).toFixed(2);
        champDamageData.push(magicBefore[i]);      
    }
    
 
    
    res.locals = {champDamageData: champDamageData}
    res.render('partials/damage');
}

    

