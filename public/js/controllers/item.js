app.controller('ItemController', function($scope, $http, $location, $routeParams, Item) {
	$scope.itemImages = [];

	$scope.init = function (){
			Item.get_item_files({}, function(result) {
				console.log(result);
               $http.get('js/items.json').success(function(data) {
					var arr = [];
		   			var obj = data["data"];
					for (a in obj) {
						var s = a.toString() + ".png"
					   	if(result.indexOf(s) > -1)
					   	arr.push(obj[a])
					}
					console.log(arr);
					arr.sort(compare);
					var newObj = [];
					arr.forEach(function(item){
						newObj.push({id: item.id + '.png', name: item.name});
					})
					//console.log(newObj);
					$scope.itemImages = newObj;
					});
		function compare(a,b) {
		  if (a.name < b.name)
		    return -1;
		  else if (a.name > b.name)
		    return 1;
		  else 
		    return 0;
		}
		//$scope.itemImages = result;
               
                

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



});

