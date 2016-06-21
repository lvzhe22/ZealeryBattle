var app = angular.module('appOne', []);

app.controller('ctrl', function($scope) {
	$scope.second = 1;

	$scope.productList = [
		productOne = {
			name : "Plain White T",
			img : "https://metrouk2.files.wordpress.com/2013/07/gapcopy.jpg",
			count : 0
		}, 

		productTwo = {
			name : "V-Neck T-Shirt",
			img : "http://www.customink.com/mms/images/catalog/styles/161700/catalog_detail_image_large.jpg",
			count : 0
		},

		productThree = {
			name : "Flannel Shirt",
			img : "http://s5.thisnext.com/media/largest_dimension/57339101.jpg",
			count : 0
		},

		productFour = {
			name : "Long-Sleeve Shirt",
			img : "http://www.dryshirt.com/merchant5/graphics/00000002/DRYSHIRT-%20Long%20sleeve%20Kore%20Dry%20Red%20LRG.jpg",
			count : 0
		}
	];

	// This Function increases the count of a product by 1
	$scope.updateValue = function(index) {
		$scope.productList[index].count = $scope.productList[index].count + 1; 
	}

});

// This function searches the productList for products who have the same counts
// and creates a battle between them.
function chooseBattleItems(productList, playAgain) {
	sort()
	check for doubles()
	if doubles{
		createBattleItems(double1, double2);
		return true;
	} else {
		return false;
	}

}


// This function builds the options that the user will choose from in the html. Each
// option will have an Image and the Name of the item  in the image.
// pre: 
function createBattleItems(product1, product2) {
	// create LI nodes with img tags > P tags
	var ul = document.getElementById('productList');
	var li;
	var img;
	var text;	

	for(product in arguments) {
		li = document.createElement('li');
		li.ng-model = "productList[" + arguments[product] + "].count";

		img = document.createElement('img');
		img.src = "{{ productList[" + arguments[product] + "].img }}";
		img.ng-click = "updateValue(" +  arguments[product] + ")";
		img.onClick = "chooseBattleItems(productList, playAgain)";

		text = document.createElement('p');
		text.appendChild(document.createTextNode("{{ productList[" + arguments[product] + "].name }}"))
		
		li.appendChild(img);
		li.appendChild(text);
		ul.appendChild(li)
	}

}





