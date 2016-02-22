var app = angular.module('abra', ['ngRoute', 'ngResource', 'chart.js']);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider.

	when('/', {
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
}])

.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("!");
}])

app.controller('ItemController', ["$scope", "$http", "$location", "$routeParams", "Item", function($scope, $http, $location, $routeParams, Item) {
	$scope.itemImages = [];
	
	function compare(a,b) {
	  	if (a.name < b.name)
	    	return -1;
	  	else if (a.name > b.name)
	    	return 1;
	  	else 
	    	return 0;
	}

	$scope.init = function (){
		Item.get_item_files({}, function (result) {
            $http.get('js/items.json').success(function (data) {
				var arr = [];
		   		var items = data['data'];
				
				// Create a new array for the item images that are currently used locally
				for (item in items) {
					var itemFile = item.toString() + ".png"
				   	if (result.indexOf(itemFile) > -1) arr.push(items[item]);
				}

				arr.sort(compare);

				// Create an array of objects with the itemID and item name.
				// Might be able to merge this was the previous for loop. 
				var newArr = [];

				arr.forEach(function (item) {
					newArr.push({id: item.id + '.png', name: item.name});
				})
				
				$scope.itemImages = newArr;
			});               
        }, function (err) {
             console.log("err" + err);
        });
	};

	$scope.getImagePath = function(itemName) {
        return  '/img/item/' + itemName;
	};

}]);


app.controller('ItemDataController', ["$scope", "$q", "$http", "$location", "$routeParams", "Item", function($scope, $q, $http, $location, $routeParams, Item) {
	var regions = {
		'BR': 'Brazil', 
		'EUW': 'Europe West', 
		'EUNE': 'Europe Northeast',
		'LAN': 'Latin America North', 
		'LAS': 'Latin America South', 
		'KR': 'Korea',
		'NA': 'North America', 
		'OCE': 'Oceanic', 
		'TR': 'Turkey', 
		'RU': 'Russia'
	};
						
	$scope.items = [];

	$scope.init = function (){
        
        // Array that holds two distinct match versions that will be compared
		$scope.mv = [];

    	$http.get('js/items.json').success(function(data) {
    		$scope.itemName = data["data"][itemId]["name"];
    	});

		var type = $routeParams.type;
		var region = $routeParams.region;
		var itemId =  $routeParams.itemId;
		$scope.type = type.charAt(0).toUpperCase() + type.slice(1);
		$scope.region = regions[region];
		var totalWins = 0;

		Item.item_query({ type: type, region: region, itemId: itemId}, function(result) {
        	if (result.length == 0) {
        		return $location.path('views/404.html');
        	}
        	var temp = [];
        	for (i in result[0]) {
        		if (i.substr(0,7) == "it0wins") {
        			temp.push(parseInt(i.substr(-3)));
        		}
        		if (temp.length == 2) {
    				$scope.mv.push(Math.min(temp[0], temp[1]).toString());
    				$scope.mv.push(Math.max(temp[0], temp[1]).toString());
    				break;
        		}
        	}
        		
        	result.forEach(function(champ) {
                // First patch winrates
        		champ["it0winrate" + $scope.mv[0]] = (100 * champ["it0winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it1winrate" + $scope.mv[0]] = (100 *champ["it1winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it2winrate" + $scope.mv[0]] = (100 *champ["it2winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it3winrate" + $scope.mv[0]] = (100 *champ["it3winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it4winrate" + $scope.mv[0]] = (100 *champ["it4winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it5winrate" + $scope.mv[0]] = (100 *champ["it5winrate" + $scope.mv[0]]).toFixed(2);

                champ["totalWinRate" + $scope.mv[0]] = parseFloat(champ["it0winrate" + $scope.mv[0]]) + parseFloat(champ["it1winrate" + $scope.mv[0]]) + 
                parseFloat(champ["it2winrate" + $scope.mv[0]]) + parseFloat(champ["it3winrate" + $scope.mv[0]]) + parseFloat(champ["it4winrate" + $scope.mv[0]]) + 
                parseFloat(champ["it5winrate" + $scope.mv[0]]);

                // Second patch winrates
        		champ["it0winrate" + $scope.mv[1]] = (100 *champ["it0winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it1winrate" + $scope.mv[1]] = (100 *champ["it1winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it2winrate" + $scope.mv[1]] = (100 *champ["it2winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it3winrate" + $scope.mv[1]] = (100 *champ["it3winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it4winrate" + $scope.mv[1]] = (100 *champ["it4winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it5winrate" + $scope.mv[1]] = (100 *champ["it5winrate" + $scope.mv[1]]).toFixed(2);

                champ["totalWinRate" + $scope.mv[1]] = parseFloat(champ["it0winrate" + $scope.mv[1]]) + parseFloat(champ["it1winrate" + $scope.mv[1]]) + 
                parseFloat(champ["it2winrate" + $scope.mv[1]]) + parseFloat(champ["it3winrate" + $scope.mv[1]]) + parseFloat(champ["it4winrate" + $scope.mv[1]]) + 
                parseFloat(champ["it5winrate" + $scope.mv[1]]);

                // First patch total wins

        		champ["totalWins" + $scope.mv[0]] = champ["it0wins" + $scope.mv[0]] + champ["it1wins" + $scope.mv[0]] + 
        		champ["it2wins" + $scope.mv[0]] + champ["it3wins" + $scope.mv[0]] + champ["it4wins" + $scope.mv[0]] + 
        		champ["it5wins" + $scope.mv[0]];

                // Second patch total wins

        		champ["totalWins" + $scope.mv[1]] = champ["it0wins" + $scope.mv[1]] + champ["it1wins" + $scope.mv[1]] + 
        		champ["it2wins" + $scope.mv[1]] + champ["it3wins" + $scope.mv[1]] + champ["it4wins" + $scope.mv[1]] + 
        		champ["it5wins" + $scope.mv[1]];

                // Differences

        		champ["winDifferenceAfterBefore"] = champ["totalWins" + $scope.mv[1]] - champ["totalWins" + $scope.mv[0]];
        		champ["winDifferenceBeforeAfter"] = champ["totalWins" + $scope.mv[0]] - champ["totalWins" + $scope.mv[1]];

        		champ["winRateDifferenceAfterBefore"] = (champ["totalWinRate" + $scope.mv[1]] - champ["totalWinRate" + $scope.mv[0]]).toFixed(4);
        		champ["winRateDifferenceBeforeAfter"] = (champ["totalWinRate" + $scope.mv[0]] - champ["totalWinRate" + $scope.mv[1]]).toFixed(4);
        	});
        	$scope.items = result;      	
        }, function (err) {
        	console.log(err);
        });
	};

    $scope.getData = function(champion) {
        // Convenience variables for each patch
        var v1 = $scope.mv[0];
        var v2 = $scope.mv[1];

        // Create the Chart.js pie chart and initialize variables for each champion 

        $scope.pielabel = [v1 + ' Patch', v2 + ' Patch'];
        champion.it0 = [champion["it0wins" + v1].toString(), champion["it0wins" + v2].toString()];
        champion.it1 = [champion["it1wins" + v1].toString(), champion["it1wins" + v2].toString()];
        champion.it2 = [champion["it2wins" + v1].toString(), champion["it2wins" + v2].toString()];
        champion.it3 = [champion["it3wins" + v1].toString(), champion["it3wins" + v2].toString()];
        champion.it4 = [champion["it4wins" + v1].toString(), champion["it4wins" + v2].toString()];
        champion.it5 = [champion["it5wins" + v1].toString(), champion["it5wins" + v2].toString()];
    }

    // Default sort method
    $scope.sortDropdown = 'winRateDifferenceAfterBefore'
    $scope.sortFunction = function(champion) {
        if (isNaN(champion[$scope.sortDropdown]))
            return champion[$scope.sortDropdown];
        else 
            return parseFloat(champion[$scope.sortDropdown]);
    }

    // Redirect to the correct regions

    $scope.getNormalPath = function(region) {
    	var itemId = $location.path().split('/').pop();
    	$location.path("/items/normal/" + region + itemId);
    } 

    $scope.getRankedPath = function(region) {
    	var itemId = $location.path().split('/').pop();
    	$location.path("/items/ranked/" + region + itemId);
    }

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
app.filter('reverse', function() {
  return function(items) {
    if (typeof items === 'undefined') { return; }
    return angular.isArray(items) ? 
      items.slice().reverse() : // If it is an array, split and reverse it
      (items + '').split('').reverse().join(''); // else make it a string (if it isn't already), and reverse it
  };
});
app.filter('split', function() {
	return function (input, splitChar, splitIndex) {
		return input.split(splitChar)[splitIndex];
	};
});

    