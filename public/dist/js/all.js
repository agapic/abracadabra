var app = angular.module('abra', ['ngRoute', 'ui.bootstrap', 'ngResource']);

app.config(["$routeProvider", function ($routeProvider) {
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
}])

.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("!");
    }])

// app.controller('IndexController', function($scope) {
// 	$scope.message = 'This is sort of an index. Lol.';
// });
app.controller('IndexController', ["$scope", function($scope) {
	
}]);
app.controller('ItemController', ["$scope", "$location", "$routeParams", "Item", function($scope, $location, $routeParams, Item) {
	$scope.itemImages = [];

	$scope.init = function (){
			Item.get_item_files({}, function(result) {
                $scope.itemImages = result;
            }, function(err) {
            	console.log("err" + err);
            });
	};

	$scope.getImagePath = function(itemName) {
        return  '/img/item/' + itemName;
	};

	$scope.getItem = function(item) {
		var itemId =  (item.split('.')[1] === 'png') ? item.slice(0,-4) : item;
		Item.item_query({ itemId: itemId}, function(result) {
        	console.log("result" + result);
        }, function(err) {
        	console.log("err" + err);
        });
	};

	

}]);


window.app.factory("Item", ["$resource", function ($resource) {
    return $resource('api/:action/:itemId',{},
        {
            get_item_files: {
                method: 'GET',
                isArray: true,
                params: {
                	action: 'items'
                }
            },

            item_query: {
            	method: 'GET',
            	isArray: true,
            	params: {
            		action: 'items',
            		itemId: '@itemId'
            	},
            	cache: false
            }


        });
}]);
app.filter('split', function() {
	return function(input, splitChar, splitIndex) {
		return input.split(splitChar)[splitIndex];
	};
});

    