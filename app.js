
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var routes = require('./routes/routes');

//Basic config for ports and views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.set('view options', {layout: 'layout'});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
 
    
//Routes
app.get('/', routes.index);
app.get('/champions', routes.champions);
app.get('/items/', routes.items);
app.get('/items/:item', routes.itemData);
app.get('/items/:item/:gamemode', routes.itemData);
app.get('/items/:item/:gamemode/:region', routes.itemData);
app.get('/champions/:gamemode/:region', routes.damage);
app.get('/champions/:gamemode', routes.damage);

//Listen to dat port
app.listen(app.get('port'), function(){
    console.log("The application is listening on port " + app.get('port'))
});
    
    
