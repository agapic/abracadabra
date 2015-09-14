/* Waits for get requests that are sent from app.js */

var hbs = require('hbs');
var fs = require('fs');

//Register handlebars partials and directories
hbs.registerPartial('header', fs.readFileSync('./views/partials/header.hbs', 'utf8'));
hbs.registerPartial('bodyBG', fs.readFileSync('./views/partials/bodyBG.hbs', 'utf8'));
hbs.registerPartial('damageData', fs.readFileSync('./views/partials/damage.hbs', 'utf8'));
hbs.registerPartial('itemsData', fs.readFileSync('./views/partials/items.hbs', 'utf8'));
hbs.registerPartials(__dirname + '../views/partials/');

//Handle routes
exports.index = function (req, res) {
    'use strict';
    res.render('index', {layout: 'layout'});
};

exports.champions = function (req, res) {
    'use strict';
    res.render('champions', {layout: 'champions'});
};

exports.items= function (req, res) {
    'use strict';
            if(req.path === '/items/'){
        res.redirect('/items');
    }
    res.render('items', {layout: 'items'});
};


exports.itemData = function (req, res) {
    console.log(req.params);
    var itemAbbreviations = {
            "Blasting":"Blasting Wand",
            "Needlessly":"Needlessly Large Rod",
            "Deathcap":"Rabadon\'s Deathcap",
            "Hourglass":"Zhonya\'s Hourglass",
            "Luden":"Luden\'s Echo",
            "Rylai":"Rylai\'s Crystal Scepter",
            "Archangel":"Archangel\'s Staff",
            "Seraph":"Seraph\'s Embrace",
            "Ages":"Rod of Ages",
            "Guise":"Haunting Guise",
            "Torment":"Liandry\'s Torment",
            "Void":"Void Staff",
            "Nashor":"Nashor\'s Tooth",
            "Ancients":"Will of the Ancients",
            "Morello":"Morellonomicon",
            "Athene":"Athene\'s Holy Grail"
            }     
    
    
    var item = req.params.item;
    var region = req.params.region;
    var gamemode = req.params.gamemode;
    
    var itemDisplay = itemAbbreviations[item];
    
    
    if(!gamemode){
        res.redirect('/items/'+item+'/RANKED');
        return;
    }
    
    if(!region){
        region = '';
    }
    try{
    if (region){
        var itemsBefore = require('../data/database_query_results/items/11'+gamemode+region+item+'.json');
        var itemsAfter = require('../data/database_query_results/items/14'+gamemode+region+item+'.json');    
    }
    else {
        var itemsBefore = require('../data/database_query_results/items/11'+gamemode+item+'.json');
        var itemsAfter = require('../data/database_query_results/items/14'+gamemode+item+'.json');
        }
    } catch (err){
        console.log("error");
    }
    console.log(itemsBefore.length);
    console.log(itemsAfter.length);
    var itemData = [];
        
    for (i = 0; i < itemsBefore.length; i++){
        for(j = 0; j < itemsAfter.length; j++){
            if(itemsBefore[i].champname === itemsAfter[j].champname){
                itemsBefore[i].amountboughtAfter = itemsAfter[j].amountbought;
                itemsBefore[i].totalitemwinsAfter = itemsAfter[j].totalitemwins; 
                itemsBefore[i].totalitemlossesAfter = itemsAfter[j].totalitemlosses;
                
                for(n = 0; n < 6; n++){
                itemsBefore[i]["item"+n+"winsAfter"] = itemsAfter[j]["item"+n+"wins"]
                itemsBefore[i]["item"+n+"amountAfter"] = itemsAfter[j]["item"+n+"amount"]
                itemsBefore[i]["item"+n+"lossesAfter"] = itemsAfter[j]["item"+n+"losses"]
                }
                itemData.push(itemsBefore[i]);

            itemData.sort(function(a,b){
                if(a.totalitemwins != undefined && b.totalitemwins != undefined){
                    return parseFloat(a.totalitemwins) - parseFloat(b.totalitemwins);   
                }
                if(a.totalitemwins != undefined){
                    return parseFloat(a.totalitemwins);  
                }
                if(b.totalitemwins != undefined){
                return parseFloat(b.totalitemwins*-1);  
                }
                
            });
            itemData.reverse();
            }

        }
    }

    res.locals = {itemData: itemData, gamemode: gamemode, region: region, itemDisplay: itemDisplay, item: item};
    res.render('itemData', {layout: 'itemData'});
};

exports.damage = function (req, res) {
    

    var gamesBefore, gamesAfter, champDataLength, champDamageData, i,
        elementNum;
    
    var region = req.params.region;
    var gamemode = req.params.gamemode;
    console.log(req.path);
    if(req.path === '/champions'){
        res.redirect('/champions/');
        return;
    }

    if(!gamemode){
        console.log('none');
        res.redirect('/champions/RANKED');
        
    }
    
    if(!region){
        region = '';
    }
    console.log(gamemode);
    console.log(region);
    try {
        if(region.length>0){    
        var dataBefore = require('../data/database_query_results/damage/11' + gamemode + region + '.json');
        var dataAfter = require('../data/database_query_results/damage/14' + gamemode + region + '.json');
        }
        else{
        var dataBefore = require('../data/database_query_results/damage/11' + gamemode + '.json');
         var dataAfter = require('../data/database_query_results/damage/14' + gamemode + '.json');
        }
    

    } catch (err) {
        res.send("You're silly.");
    }
    var concatData = [];
    for(var i = 0; i < dataBefore.length; i++){
        for(var j = 0; j < dataAfter.length; j++){
            if(dataBefore[i].champname === dataAfter[j].champname){
                concatData[i] = dataBefore[i]
                concatData[i].afterSum = dataAfter[j].sum;
                concatData[i].damageDifference = parseFloat(((concatData[i].sum - concatData[i].afterSum) / concatData[i].sum) * 100).toFixed(2);
                if(concatData[i].damageDifference < 0){
                  concatData[i].damageColor = 'red';
                }else{
                  concatData[i].damageColor = 'green';
                }
                concatData[i].gamesAfterWins = dataAfter[j].gamesAfterWins
                concatData[i].gamesAfter = dataAfter[j].gamesAfter
                concatData[i].gamesAfterWinrate = dataAfter[j].gamesAfterWinrate
                concatData[i].damagePerGameBefore = parseFloat(concatData[i].sum / concatData[i].gamesBefore).toFixed(0);
                concatData[i].damagePerGameAfter = parseFloat(concatData[i].afterSum / concatData[i].gamesAfter).toFixed(0);
                concatData[i].winrateDifference = parseFloat(concatData[i].gamesAfterWinrate - concatData[i].gamesBeforeWinrate).toFixed(2);
                if(concatData[i].winrateDifference < 0){
                  concatData[i].winColor = 'red';
                }else{
                  concatData[i].winColor = 'green';
                }
                
            }
        }
    }
    

    
 
    
    res.locals = {champData: concatData, gamemode: gamemode, region: region};
    res.render('partials/damage', {layout: 'champions'});
};

    

