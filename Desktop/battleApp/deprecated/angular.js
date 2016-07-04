var app = angular.module('appOne', []);

app.controller('ctrl', function($scope) {
	$scope.data = 1;
	$scope.data.second = 1;
	

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
	$scope.update = function(pIndex) {
		$scope.productList[pIndex].count = (+$scope.productList[pIndex].count + 1);
		console.log($scope.productList[pIndex].count);		
		$scope.data = (+$scope.data + 1);
	}

	$scope.currentLeftText = "helloLeft";
	$scope.currentRightText = "helloright";

	$scope.getImages = function(lpIndex, rpIndex) {
		$scope.currentLeftImage = $scope.productList[lpIndex].img;
		$scope.currentRightImage = $scope.productList[rpIndex].img;
	}

	$scope.getText = function(lpIndex, rpIndex) {
		$scope.currentLeftText = $scope.productList[lpIndex].name;
		$scope.currentRightText = $scope.productList[rpIndex].name;
	}	

});

// This function builds the options that the user will choose from in the html. Each
// option will have an Image and the Name of the item  in the image.
// pre: 
function createBattleItems(product1, product2) {
	var ul = document.getElementById('productList');
	var li;
	var img;
	var text;	
	angular.element(document.getElementById("main")).scope().getText(0,2);

	for(index in arguments) {
		li = document.createElement('li');
		li.id = "product" + index; // Gives list items ids product0 and product1
		li.onClick = "updateValue( " + index + ", " + arguments[index] + ")";
		// li.ng-model = "productList[" + arguments[index] + "].count";

		img = document.createElement('img');
		img.src = "{{ productList[" + arguments[index] + "].img }}";
		if(index == 0) {
			img.src = "{{currentLeftImage}}";	
		} else {
			img.src = "{{currentRightImage}}";	
		}
		//img.class = "ng-click = \"console.log(\"hello\");	\";"
		//img.class = "ng-click = \"updateValue(" +  arguments[index] + ")\";"
		img.onClick = "chooseBattleItems(productList, playAgain)";

		text = document.createElement('p');
		//if(index == 0) {
			text.appendChild(document.createTextNode("{{currentRightText}}"));
		// } else {
		// 	text.appendChild(document.createTextNode("{{currentLeftText}}"));
		// }
		
		li.appendChild(img);
		console.log(text);
		li.appendChild(text);
		ul.appendChild(li)
	}

}

// This function calls the update function in the angular js
// pre: There must be elements with the id's "product0" and "product1"
//		else a uncaught type error will be thrown
// post: The update function in the angular js is called, increasing the value of the 
//		 count of the product with the given index 
// function updateValue(iIndex, pIndex) {
// 	angular.element(document.getElementById("product" + iIndex)).scope().update(pIndex);
// }

// This function searches the productList for products who have the same counts
// and creates a battle between them. The algorithm is NOT PERMANENT.
function chooseBattleItems(i) {

	createBattleItems(i, i + 1); 

}

// This function shows a screen with a congragulatory image. 
function showFinishScreen() {
	var ul = document.getElementById('productList');
	var li;
	var img;
	
	li = document.createElement('li');
	li.id = 'finishScreen';

	img = document.createElement('li');
	img.src = "http://kingdom-of-heaven.com/wp-content/uploads/2014/01/it-is-finished.jpg";

	li.appendChild(img);
	ul.appendChild(li);
}

// This function clears the screen of all products
// pre: A document element with the id 'productList' must exist. It should be an ul.
// post: The document element with the id 'productList' will have no children nodes.
function clearScreen() {
	var ul = document.getElementById('productList');
	while(ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
}

function getText(i1,i2) {
	angular.element(document.getElementById("main")).scope().getText(i1,i2); 
}



