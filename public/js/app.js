var app = angular.module('abra', ['ngRoute', 'ui.bootstrap', 'ngResource']);

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
        templateUrl: 'views/index.html'
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

// app.controller('IndexController', function($scope) {
// 	$scope.message = 'This is sort of an index. Lol.';
// });