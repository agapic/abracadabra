var core = require('./heart.js');
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('../routes/routes');

//config

app.set('views', path.join(__dirname, '../views'));
app.set('view engine','html');
app.engine('html', hbs.__express);

//Routes
app.get('/', routes.index);
app.get('/data', routes.data);
        
//Listen to dat port
app.listen(3002, function(){
    console.log("listening");
});




   