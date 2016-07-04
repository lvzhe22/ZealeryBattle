var app = angular.module('appOne', []);

app.controller('ctrl', function($scope) {

	$scope.listItems = 2; // number of products on screen

	$scope.productsOnScreen = [$scope.listItems]; // Initialize Array containing products on screen

	$scope.productList = [ // Proxy List of Products
		productOne = {
			name : "Plain White T",
			image : "https://metrouk2.files.wordpress.com/2013/07/gapcopy.jpg",
			index : 0,
			count : 0
		}, 

		productTwo = {
			name : "V-Neck T-Shirt",
			image : "http://www.customink.com/mms/images/catalog/styles/161700/catalog_detail_image_large.jpg",
			index : 1,
			count : 0
		},

		productThree = {
			name : "Flannel Shirt",
			image : "http://s5.thisnext.com/media/largest_dimension/57339101.jpg",
			index : 2,
			count : 0
		},

		productFour = {
			name : "Long-Sleeve Shirt",
			image : "http://www.dryshirt.com/merchant5/graphics/00000002/DRYSHIRT-%20Long%20sleeve%20Kore%20Dry%20Red%20LRG.jpg",
			index : 3,
			count : 0
		}
	]; 

	// This function increases the count of the chosen product by 1 and loads a new set of products to choose from
	// pre: index must be >= 0 and < productList.length
	// post: A new group of products will be displayed to choose from and the clicked upon product will have a count increased by 1  
	$scope.update = function(index) {
		$scope.productList[index].count = (+$scope.productList[index].count + 1);
		$scope.chooseProducts(2,3);
		console.log($scope.productList[index].name + ": " + $scope.productList[index].count);
	}

	// This function changes the products stored in the productsOnScreen array to the product indeces passed
	// pre: all the indeces passed must be >= 0 and < productList.length and none of them can be the same index
	// post: the products on screen will be the products with the indeces passed
	$scope.chooseProducts = function(p1, p2, p3, p4) {
		$scope.productsOnScreen = [$scope.productList[p1], $scope.productList[p2]];
	}

});