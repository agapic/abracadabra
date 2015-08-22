var core = require('./heart.js');
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('../routes/routes');
var champs = require('../data/champNames');
var fs = require('fs');

//config

app.set('views', path.join(__dirname, '../views'));
app.set('view engine','html');
app.engine('html', hbs.__express);


var champLength = champs.convert("inject")
var champList = champs.convert("champList")
var i = 0;
for(i = 1; i < 32; i++){
    if(!champList[i]){
        continue;
    }   
    var temp = champList[i];
   core.queryByChamp(temp, function(data) {
       if(!data.sum){
           return;
       }
 fs.writeFile('../stats/magicDamageBefore.json',champList[i] + ": " + data.sum);
       
   })
    
}
    
    
hbs.registerHelper('each_when', function(list, k, v, opts) {

    var i, result = '';
    for(i = 0; i < list.length; ++i)
        if(list[i][k] == v)
            result = result + opts.fn(list[i]);
    return result;
});

//Routes
app.get('/', routes.index);
app.get('/data', routes.data);
        
//Listen to dat port
app.listen(3002, function(){
    console.log("listening");
});




   