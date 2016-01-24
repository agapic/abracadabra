var app = angular.module('abra', ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider.

	when('/', {
		controller: 'IndexController',
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


}])

// app.controller('IndexController', function($scope) {
// 	$scope.message = 'This is sort of an index. Lol.';
// });
app.controller('IndexController', ["$scope", function($scope) {
	$scope.message = 'This is sort of an index. Lol.';
}]);