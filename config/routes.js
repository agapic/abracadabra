module.exports = function (app) {
    var index = require('../app/controllers/index');
    app.get('/', index.render);
    
    var items = require('../app/controllers/itemBackend');
    app.get('/api/items', items.getItemFiles);
    app.get('/api/items/:type/:region?/:itemId', items.getItem);

    app.get('*', function(req, res) {
        // Redirect to frontend if not requesting html template
             if (!req.originalUrl.match(/\.html$/)) {
            return res.redirect('/#!' + req.originalUrl);
        }
    });

}