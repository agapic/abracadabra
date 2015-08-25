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
    fileBefore = require('../bin/stats/getMagicBefore'+regions+'.json');
    fileAfter = require('../bin/stats/getMagicAfter'+regions+'.json');
    
    var champDataLength = fileBefore.length;
    if(fileBefore.length > fileAfter.length){
        champDataLength = fileAfter.length;
    }

    var champDamageData = [];
    for(i = 0; i < champDataLength; i++) {
        var elementNum = fileBefore[i];
        elementNum["afterSum"] = fileAfter[i].sum;   
        elementNum["difference"] = parseFloat(((fileAfter[i].sum - fileBefore[i].sum) / fileBefore[i].sum)*100).toFixed(2);
        champDamageData.push(fileBefore[i]);      
    }
    res.locals = {champDamageData: champDamageData}
    res.render('partials/damage');
}

    

