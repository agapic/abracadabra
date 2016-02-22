app.controller('ItemDataController', function($scope, $q, $http, $location, $routeParams, Item, spinnerService) {
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
	
	

	$scope.spinnerService = spinnerService;
	$scope.init = function (){
		$scope.mv = [];
    	$http.get('js/items.json').success(function(data) {
    		console.log(data["data"][itemId]["name"])
    		$scope.itemName = data["data"][itemId]["name"];
    	})

		var type = $routeParams.type;
		var region = $routeParams.region;
		var itemId =  $routeParams.itemId;
		$scope.type = type.charAt(0).toUpperCase() + type.slice(1);
		$scope.region = regions[region];
		var totalWins = 0;
		Item.item_query({ type: type, region: region, itemId: itemId}, function(result) {
        	if(result.length == 0) {
        		return $location.path('views/404.html');
        	}
        	        		var temp = [];
        	for (i in result[0]) {

        		if(i.substr(0,7) == "it0wins") {
        			temp.push(parseInt(i.substr(-3)));
        			}
        			if(temp.length == 2){
        				$scope.mv.push(Math.min(temp[0], temp[1]).toString());
        				$scope.mv.push(Math.max(temp[0], temp[1]).toString());
        				break;
        			}
        		}
        		
        	result.forEach(function(champ) {
        		champ["it0winrate" + $scope.mv[0]] = (100 * champ["it0winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it1winrate" + $scope.mv[0]] = (100 *champ["it1winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it2winrate" + $scope.mv[0]] = (100 *champ["it2winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it3winrate" + $scope.mv[0]] = (100 *champ["it3winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it4winrate" + $scope.mv[0]] = (100 *champ["it4winrate" + $scope.mv[0]]).toFixed(2);
        		champ["it5winrate" + $scope.mv[0]] = (100 *champ["it5winrate" + $scope.mv[0]]).toFixed(2);

        		champ["it0winrate" + $scope.mv[1]] = (100 *champ["it0winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it1winrate" + $scope.mv[1]] = (100 *champ["it1winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it2winrate" + $scope.mv[1]] = (100 *champ["it2winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it3winrate" + $scope.mv[1]] = (100 *champ["it3winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it4winrate" + $scope.mv[1]] = (100 *champ["it4winrate" + $scope.mv[1]]).toFixed(2);
        		champ["it5winrate" + $scope.mv[1]] = (100 *champ["it5winrate" + $scope.mv[1]]).toFixed(2);


        		champ["totalWins" + $scope.mv[0]] = champ["it0wins" + $scope.mv[0]] + champ["it1wins" + $scope.mv[0]] + 
        		champ["it2wins" + $scope.mv[0]] + champ["it3wins" + $scope.mv[0]] + champ["it4wins" + $scope.mv[0]] + 
        		champ["it5wins" + $scope.mv[0]];

        		champ["totalWinRate" + $scope.mv[0]] = parseFloat(champ["it0winrate" + $scope.mv[0]]) + parseFloat(champ["it1winrate" + $scope.mv[0]]) + 
        		parseFloat(champ["it2winrate" + $scope.mv[0]]) + parseFloat(champ["it3winrate" + $scope.mv[0]]) + parseFloat(champ["it4winrate" + $scope.mv[0]]) + 
        		parseFloat(champ["it5winrate" + $scope.mv[0]]);

        		champ["totalWins" + $scope.mv[1]] = champ["it0wins" + $scope.mv[1]] + champ["it1wins" + $scope.mv[1]] + 
        		champ["it2wins" + $scope.mv[1]] + champ["it3wins" + $scope.mv[1]] + champ["it4wins" + $scope.mv[1]] + 
        		champ["it5wins" + $scope.mv[1]];

        		champ["totalWinRate" + $scope.mv[1]] = parseFloat(champ["it0winrate" + $scope.mv[1]]) + parseFloat(champ["it1winrate" + $scope.mv[1]]) + 
        		parseFloat(champ["it2winrate" + $scope.mv[1]]) + parseFloat(champ["it3winrate" + $scope.mv[1]]) + parseFloat(champ["it4winrate" + $scope.mv[1]]) + 
        		parseFloat(champ["it5winrate" + $scope.mv[1]]);

        		champ["winDifferenceAfterBefore"] = champ["totalWins" + $scope.mv[1]] - champ["totalWins" + $scope.mv[0]];
        		champ["winDifferenceBeforeAfter"] = champ["totalWins" + $scope.mv[0]] - champ["totalWins" + $scope.mv[1]];

        		champ["winRateDifferenceAfterBefore"] = (champ["totalWinRate" + $scope.mv[1]] - champ["totalWinRate" + $scope.mv[0]]).toFixed(4);
        		champ["winRateDifferenceBeforeAfter"] = (champ["totalWinRate" + $scope.mv[0]] - champ["totalWinRate" + $scope.mv[1]]).toFixed(4);

        	})
        	console.log(result);
        	console.log($scope.mv);
        	$scope.items = result;      	
        }, function(err) {
        	console.log(Object.keys(err))
        });
	};

    $scope.labels = ['1', '2', '3', '4', '5', '6'];
    $scope.series = ['5.11 Winrate', '5.11 Wins', '5.14 Winrate', '5.14 Wins'];
    $scope.getNormalPath = function(region) {
    	var itemId = $location.path().split('/').pop();
    	$location.path("/items/normal/" + region + itemId);
    } 

    $scope.getRankedPath = function(region) {
    	var itemId = $location.path().split('/').pop();
    	$location.path("/items/ranked/" + region + itemId);
    }
    $scope.sortDropdown = 'winRateDifferenceAfterBefore'
    $scope.sortFunction = function(champion) {

    	if(isNaN(champion[$scope.sortDropdown]))
				return champion[$scope.sortDropdown];
			return parseFloat(champion[$scope.sortDropdown]);
    }

$scope.getData = function(champion) {
	var v1 = $scope.mv[0];
	var v2 = $scope.mv[1];
	//console.log(champion);
	
	$scope.pielabel = [v1 + ' Patch', v2 + ' Patch'];
	champion.it0 = [champion["it0wins" + v1].toString(), champion["it0wins" + v2].toString()];
	champion.it1 = [champion["it1wins" + v1].toString(), champion["it1wins" + v2].toString()];
	champion.it2 = [champion["it2wins" + v1].toString(), champion["it2wins" + v2].toString()];
	champion.it3 = [champion["it3wins" + v1].toString(), champion["it3wins" + v2].toString()];
	champion.it4 = [champion["it4wins" + v1].toString(), champion["it4wins" + v2].toString()];
	champion.it5 = [champion["it5wins" + v1].toString(), champion["it5wins" + v2].toString()];

	champion.data = [[champion["it0winrate" + v1],champion["it1winrate" + v1],champion["it2winrate" + v1],champion["it3winrate" + v1],champion["it4winrate" + v1],champion["it5winrate" + v1]], 
			[champion["it0wins" + v1],champion["it1wins" + v1],champion["it2wins" + v1],champion["it3wins" + v1],champion["it4wins" + v1],champion["it5wins" + v1]],
			[champion["it0winrate" + v2],champion["it1winrate" + v2],champion["it2winrate" + v2],champion["it3winrate" + v2],champion["it4winrate" + v2],champion["it5winrate" + v2]], 
			[champion["it0wins" + v2],champion["it1wins" + v2], champion["it2wins" + v2],champion["it3wins" + v2],champion["it4wins" + v2],champion["it5wins" + v2]]];
			console.log(champion);
}
    // $scope.loadMore = function() {
    // 	var last = $scope.items[$scope.items.length -1];
    // 	for(var i = 0; i <=1; i++) {
    // 		$scope.items.push(i);
    // 	}
    // }

  	// $scope.setData = function (champion) {
   //  	 var data = [  ];

    	

   //  	return data;


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



});

