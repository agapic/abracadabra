app.controller('ItemDataController', function($scope, $http, $location, $routeParams, Item, spinnerService) {
	$scope.itemImages = [];

	$scope.init = function (){
		// $scope.spinnerService = spinnerService;
		// spinnerService.show('itemSpinner1');
		// spinnerService.show('itemSpinner2');
		var itemId =  $routeParams.itemId
		Item.item_query({ itemId: itemId}, function(result) {
			//console.log(result);
        	$scope.items = result;
        	//console.log($scope.itemList);
        	//$location.url("/items/"+itemId);
        }, function(err) {
        	console.log(Object.keys(err))
        });
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



});

