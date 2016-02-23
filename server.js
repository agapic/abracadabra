var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var express = require('express'),
    fs = require('fs'),
    path = require('path');
var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Express app started on port ' + port);

    
exports = module.exports = app;