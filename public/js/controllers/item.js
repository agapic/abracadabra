app.controller('ItemController', function($scope, $location, $routeParams, Item) {
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

	

});

