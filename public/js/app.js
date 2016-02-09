var app = angular.module('abra', ['ngRoute', 'ui.bootstrap', 'ngResource', 'angularSpinners']);

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
    when('/items/:itemId', {
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
