app.controller('ItemDataController', function($scope, $http, $location, $routeParams, Item, spinnerService) {
	$scope.items = [];
	$scope.data = [] ;
	$scope.spinnerService = spinnerService;
	$scope.init = function (){
		$index = -1;
		spinnerService.show('itemSpinner1');
		spinnerService.show('itemSpinner2');
		var type = $routeParams.type;
		var region = $routeParams.region;
		var itemId =  $routeParams.itemId;

		console.log(type, region, itemId);

		Item.item_query({ type: type, region: region, itemId: itemId}, function(result) {
        	$scope.items = result["5-11"]
        	
        	console.log(result);
        	




        	var arr1 = [0];
        	var arr2 = [0];
        	var seen = [];
        	for(var j = 0 ; j < result.length; j++) {
        		if(seen.indexOf(result[j].name) !== -1) break;
        		seen.push(result[j].name);
        		var fetch = search(result[j].name, result);
            	for(var i = 0; i < fetch.length; i++) {
		    		if(fetch[i].matchversion === '5.11') {
		    			arr1 = [fetch[i].it0wins];
		    		}
		    		if(fetch[i].matchversion === '5.14') {
		    			arr2 = [fetch[i].it0wins];
		    		} 
    			}
        		$scope.data[j] = [arr1, arr2];
        	}
        }, function(err) {
        	console.log(Object.keys(err))
        });
	};
    
    $scope.labels = ['1', '2', '3', '4', '5', '6'];
    $scope.series = ['Patch 5.11', 'Patch 5.14'];

	function search(nameKey, myArray){
		var arr = [];
	    for (var i=0; i < myArray.length; i++) {
	        if (myArray[i].name === nameKey) {
	        	arr.push(myArray[i]);         
	        }
	    }
	    return arr;
	}

  	// $scope.setData = function (champion) {
   //  	 var data = [  ];
    	

    	

   //  	return data;
  	// }
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

