app.controller('ItemDataController', function($scope, $http, $location, $routeParams, Item, spinnerService) {
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



});

