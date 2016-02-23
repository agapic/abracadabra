app.controller('ItemController', function($scope, $http, $location, $routeParams, Item) {
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

});

