var app = angular.module('abra', ['ngRoute', 'ui.bootstrap', 'ngResource', 'angularSpinners', 'chart.js']);

app.config(function ($routeProvider) {
	$routeProvider.

	when('/', {
		controller: 'IndexController',
		templateUrl: 'views/index.html'
	}).
    when('/items', {
        controller: 'ItemController',
        templateUrl: 'views/items.html'
    }).
    when('/items/:type/:itemId', {
        controller: 'ItemDataController',
        templateUrl: 'views/itemData.html',
    }).
    when('/items/:type/:region/:itemId', {
        controller: 'ItemDataController',
        templateUrl: 'views/itemData.html',
    }).
   otherwise({
    templateUrl: 'views/404.html',
    resolve: {
        err: function() {
            return { status: 404 };
        }
    }

});
})

.config(function ($locationProvider) {
        $locationProvider.hashPrefix("!");
    })
