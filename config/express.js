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

    //     app.use(function(req, res, next) {
    //     	res.status(404).render('404', {
    //         url: req.originalUrl,
    //         error: 'Not found'
    //     });
    // });


}