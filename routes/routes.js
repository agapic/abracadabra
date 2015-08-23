var core = require('../bin/heart.js');
var fileBefore;
var fileAfter;
var hbs = require('hbs');
var fs = require('fs');


hbs.registerPartial('damages', fs.readFileSync('./views/partials/damage.hbs', 'utf8'));
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


 
exports.index = function(req, res){
    
    res.render('index');
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
    
    console.log("Damage after before: " + fileBefore);
    console.log("Damage after file: " + fileAfter);
    console.log("Region " + regions);
    
    var champDataLength;
    if(fileBefore.length > fileAfter.length){
        champDataLength = fileAfter.length;
    }
    else{
        champDataLength = fileBefore.length;
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

    

