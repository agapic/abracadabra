var core = require('../bin/heart.js');
var fileBefore;
var fileAfter;
var hbs = require('hbs');
var fs = require('fs');



hbs.registerPartial('magicDamageAfter', fs.readFileSync( './views/partials/magicDamageAfter.hbs', 'utf8'));
hbs.registerPartial('magicDamageDifference', fs.readFileSync( './views/partials/magicDamageDifference.hbs', 'utf8'));

hbs.registerPartials(__dirname + '../views/partials/');
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('setIndex', function(value){
    this.index = Number(value + 1); //I needed human readable index, not zero based
});

exports.totalDamage = function(req, res){
    res.render('totalDamage', { title: 'League of Legends API CHALLENGE!' });
}
 
exports.index = function(req, res){
fileBefore = require('../bin/stats/getMagicBefore.json');
fileAfter = require('../bin/stats/getMagicAfter.json');
    
    var champDamageData = [];
    for(i = 0; i < fileBefore.length; i++) {
        var elementNum = fileBefore[i];
        elementNum["afterSum"] = fileAfter[i].sum;
        elementNum["difference"] = parseFloat(((fileAfter[i].sum - fileBefore[i].sum) /               fileBefore[i].sum)*100).toFixed(2);
        champDamageData.push(fileBefore[i]);
        

    }
    console.log(champDamageData[0]);


    res.locals = {champDamageData: champDamageData
        }
    res.render('index');
}

exports.magicDamage = function(req, res){
    res.locals = {
        BRbefore: a,
        BRafter: a
    }
    res.send('Region :' + req.params.region);
}
    

