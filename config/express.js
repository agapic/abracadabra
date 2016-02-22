var env = process.env.NODE_ENV || "development";
var express = require('express');
var path = require('path');

module.exports = function(app, config) {
	app.set('showStackError', true);

    app.use(express.static(config.root + '/public'));
    if (env == "development") {
        app.use(express.static(config.root + '/test'));
    }

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

}