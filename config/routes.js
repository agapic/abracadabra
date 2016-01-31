module.exports = function (app) {
    var index = require('../app/controllers/index');
    app.get('/', index.render);
    
    var items = require('../app/controllers/itemBackend');
    app.get('/api/items', items.getItemFiles);

    app.get('*', function(req, res) {
        // Redirect to Angular URL if not requesting html template
             if (!req.originalUrl.match(/\.html$/)) {
            return res.redirect('/#!' + req.originalUrl);
        }


    });

	// var teams = require('../app/controllers/teams');
	// app.get('/api/teams/:all')
	// app.get('/api/teams/:teamId', teams.show);

	// var match = require('../app/controllers/matches');
	// app.get('/api/matches/:matchId', matches.show);

	// var champions = require('../app/controllers/champions');
	// app.get('/api/champions/:championId', champions.show);

	// var items = require('../app/controllers/items');
	// app.param('itemId', items.item);
	// app.param('matchType', items.matchType);
	// app.param('region', items.region);

	// app.get('/api/items', items.all);
	// app.get('/api/items/:itemId', items.show);
	// app.get('/api/items/:itemId/:matchType/:all')
	// app.get('/api/items/:itemId/:matchType/:region', items.region);


//Implement lazy loading
}