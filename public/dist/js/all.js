var app = angular.module('abra', ['ngRoute', 'ui.bootstrap', 'ngResource', 'angularSpinners', 'chart.js']);

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
}])

.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("!");
    }])

app.controller('IndexController', ["$scope", function($scope) {
	
}]);
app.controller('ItemController', ["$scope", "$http", "$location", "$routeParams", "Item", function($scope, $http, $location, $routeParams, Item) {
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

	// $scope.getItem = function(item) {
	// 	$scope.spinnerService = spinnerService;
	// 	spinnerService.show('itemSpinner1');
	// 	spinnerService.show('itemSpinner2');
	// 	var itemId =  (item.split('.')[1] === 'png') ? item.slice(0,-4) : item;
	// 	Item.item_query({ itemId: itemId}, function(result) {
	// 		//console.log(result);
 //        	$scope.itemList = result;
 //        	//console.log($scope.itemList);
 //        	//$location.url("/items/"+itemId);
 //        }, function(err) {
 //        	console.log(Object.keys(err))
 //        });
	// };



}]);


app.controller('ItemDataController', ["$scope", "$http", "$location", "$routeParams", "Item", "spinnerService", function($scope, $http, $location, $routeParams, Item, spinnerService) {
	$scope.spinnerService = spinnerService;
	$scope.init = function (){
		spinnerService.show('itemSpinner1');
		spinnerService.show('itemSpinner2');
		var type = $routeParams.type;
		var region = $routeParams.region;
		var itemId =  $routeParams.itemId;

		Item.item_query({ type: type, region: region, itemId: itemId}, function(result) {
        	$scope.items = result;
        	console.log(result);;
        }, function(err) {
        	console.log(Object.keys(err))
        });
	};
    
    $scope.labels = ['1', '2', '3', '4', '5', '6'];
    $scope.series = ['Patch 5.11', 'Patch 5.14'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55],
      [28, 48, 40, 19, 86, 27]
  	];
	$scope.$watch("items", function(f) {
		if(f) spinnerService.hideAll();
	})

	// $scope.getItem = function(item) {
	// 	$scope.spinnerService = spinnerService;
	// 	spinnerService.show('itemSpinner1');
	// 	spinnerService.show('itemSpinner2');
	// 	var itemId =  (item.split('.')[1] === 'png') ? item.slice(0,-4) : item;
	// 	Item.item_query({ itemId: itemId}, function(result) {
	// 		//console.log(result);
 //        	$scope.itemList = result;
 //        	//console.log($scope.itemList);
 //        	//$location.url("/items/"+itemId);
 //        }, function(err) {
 //        	console.log(Object.keys(err))
 //        });
	// };



}]);


window.app.factory("Item", ["$resource", function ($resource) {
    return $resource('api/:action/:type/:region/:itemId',{},
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
                    typeId: 'type',
                    regionId: 'region',
            		itemId: 'itemId'
            	},
            }
        });
}]);
app.filter('split', function() {
	return function(input, splitChar, splitIndex) {
		return input.split(splitChar)[splitIndex];
	};
});

    