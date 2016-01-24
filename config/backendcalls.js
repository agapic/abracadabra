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

exports.itemData = function (req, res, err) {
    
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

    var itemData = [];
    var num = 0;
    for (i = 0; i < itemsBefore.length; i++){
        for(j = 0; j < itemsAfter.length; j++){
            if(itemsBefore[i].champname === itemsAfter[j].champname){
                itemData[num] = itemsBefore[i];
                itemData[num].amountboughtAfter = itemsAfter[j].amountbought;
                
                if(itemsBefore[i].totalitemwins === undefined){
                    itemsBefore[i].totalitemwins = 0;
                }
                
                if(itemsAfter[j].totalitemwins === undefined){
                    itemsAfter[j].totalitemwins = 0;
                }
                    
                itemData[num].totalitemwinsAfter = itemsAfter[j].totalitemwins;
                
                itemData[num].totalitemlossesAfter = itemsAfter[j].totalitemlosses;
                
                if(itemData[num].totalitemwinsAfter === undefined){
                    itemData[num].totalitemwinsAfter = 0;
                }
                
                
                itemData[num].totalWinrateBefore = ((itemsBefore[i].totalitemwins / itemsBefore[i].amountbought)*100).toFixed(2);
                itemData[num].totalWinrateAfter = ((itemsBefore[i].totalitemwinsAfter / itemsBefore[i].amountboughtAfter)*100).toFixed(2);
                itemData[num].winrateDifference = parseFloat(itemData[num].totalWinrateAfter - itemData[num].totalWinrateBefore).toFixed(2);
                console.log(itemData[num].winrateDifference);
                
                
                for(n = 0; n < 6; n++){
                itemData[num]["item"+n+"winsAfter"] = itemsAfter[j]["item"+n+"wins"]
                itemData[num]["item"+n+"amountAfter"] = itemsAfter[j]["item"+n+"amount"]
                itemData[num]["item"+n+"lossesAfter"] = itemsAfter[j]["item"+n+"losses"]
                }

            num++;
            }
            

        }
    }
    
    
                itemData.sort(function(a,b){
                    return parseFloat(a.winrateDifference) - parseFloat(b.winrateDifference);   
                
  
                
            });
    
    itemData.reverse();

    res.locals = {itemData: itemData, gamemode: gamemode, region: region, itemDisplay: itemDisplay, item: item};
    res.render('itemData', {layout: 'itemData'});
};


exports.damage = function (req, res) {
    

    var gamesBefore, gamesAfter, champDataLength, champDamageData, i,
        elementNum;
    
    var region = req.params.region;
    var gamemode = req.params.gamemode;
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
    var num = 0;
    for(var i = 0; i < dataBefore.length; i++){
        for(var j = 0; j < dataAfter.length; j++){
            if(dataBefore[i].champname === dataAfter[j].champname){
                if(dataBefore[i].sum > 0){
    
                concatData[num] = dataBefore[i]
                concatData[num].afterSum = dataAfter[j].sum;
                
                concatData[num].damageDifference = parseFloat(((concatData[num].afterSum - concatData[num].sum) / concatData[num].sum) * 100).toFixed(2);
                if(concatData[num].damageDifference < 0){
                  concatData[num].damageColor = 'red';
                }else{
                  concatData[num].damageColor = 'green';
                }
                concatData[num].gamesAfterWins = dataAfter[j].gamesAfterWins
                concatData[num].gamesAfter = dataAfter[j].gamesAfter
                concatData[num].gamesAfterWinrate = dataAfter[j].gamesAfterWinrate
                concatData[num].damagePerGameBefore = parseFloat(concatData[num].sum / concatData[num].gamesBefore).toFixed(0);
                concatData[num].damagePerGameAfter = parseFloat(concatData[num].afterSum / concatData[num].gamesAfter).toFixed(0);
                if(concatData[num].gamesBeforeWinrate === undefined){
                    concatData[num].gamesBeforeWinrate = 0;
                }
                if(concatData[num].gamesAfterWinrate === undefined){
                    concatData[num].gamesAfterWinrate = 0;   
                }
                
                
                concatData[num].winrateDifference = parseFloat(concatData[num].gamesAfterWinrate - concatData[num].gamesBeforeWinrate).toFixed(2);
                if(concatData[num].winrateDifference < 0){
                  concatData[num].winColor = 'red';
                }else{
                  concatData[num].winColor = 'green';
                }
                num++;
                
                
            }
            }
        }
    }
    
    
    res.locals = {champData: concatData, gamemode: gamemode, region: region};
    res.render('partials/damage', {layout: 'champions'});
};

    

