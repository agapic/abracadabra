var core = require('../bin/heart.js');

var hbs = require('hbs');
var fs = require('fs');

try{
var difference = function(){
    var fileBefore = require('../bin/stats/getMagicBefore.json');
var fileAfter = require('../bin/stats/getMagicAfter.json');
    var length = fileBefore.length;
    var diff = [];
    for(i = 0; i< length; i++){
        if(fileBefore[i].champname === fileAfter[i].champname){         
            diff[i] = parseFloat(((fileAfter[i].sum - fileBefore[i].sum) /                  
            fileBefore[i].sum)*100).toFixed(2);
        }
    }
    return diff;
}
} catch (err){
    console.log("error, no file");
}

hbs.registerPartial('magicDamageAfter', fs.readFileSync( '../views/partials/magicDamageAfter.hbs', 'utf8'));
hbs.registerPartial('magicDamageDifference', fs.readFileSync( '../views/partials/magicDamageDifference.hbs', 'utf8'));

hbs.registerPartials(__dirname + '../views/partials/');

exports.index = function(req, res){
    res.render('index', { title: 'League of Legends API CHALLENGE!' });
}
 
exports.data = function(req, res){
    res.locals = {before: fileBefore,
        after: fileAfter,
        diff: difference
        }
    res.render('data');
}
