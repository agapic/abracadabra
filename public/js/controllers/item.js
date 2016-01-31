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

});

