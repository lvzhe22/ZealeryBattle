// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.controller('ctrl', ['$scope' , '$interval', function($scope, $interval) {

  // Pre-Sets
  $scope.listItems = 2; // number of products on screen
  
  $scope.i = 2;

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

  $scope.displayWhenFinished = {
    name : "Congratulations!",
    image : "http://emojipedia-us.s3.amazonaws.com/cache/09/36/093609b96d67b99f68fc329a9b2aff6f.png",
    index : -1,
    count : 0
  };

  $scope.displayWhenFinished2 = {
    name : "Congratulations!",
    image : "http://emojipedia-us.s3.amazonaws.com/cache/09/36/093609b96d67b99f68fc329a9b2aff6f.png",
    index : -2,
    count : 0
  };

  $scope.dummyProduct = {
    name: "extra products",
    image: "http://dummyimage.com/200x150/91fffb/fff.png&text=0x2B" + (+$scope.productList.length - 2),
    index: -3,
    count: 0
  }

  // HEADER DATA

  // USER DATA
  $scope.name = "John Doe";

  $scope.profilePicture = "https://lh6.googleusercontent.com/-w8N1cF25Qe8/AAAAAAAAAAI/AAAAAAAAMzk/oeCTIYO_9PM/photo.jpg";

  $scope.score = 150;

  $scope.moves = +$scope.productList.length / 2;

  // This function is called when the user taps the exit button in the upper right corner
  $scope.exit = function() {
    console.log("exit clicked");
    $scope.battleStarted = false;
    $scope.battleFinished = false;
  };

  // PRE-BATTLE SCREEN
  // This function builds an array of products that will be displayed before the battle starts
  $scope.preBattleScreen = function() {
    $scope.productsInBattle = [2]; // Initialize array of prescreen product display
    if($scope.productList.length < 4) {
      $scope.productsInBattle = [$scope.productList.length];
      for(product in $scope.productList) {
        $scope.productsInBattle[product] = $scope.productList[product];
      }
    } else {
      for(i in [0, 1]) {
        $scope.productsInBattle[i] = $scope.productList[i];
      }
      $scope.productsInBattle[2] = $scope.dummyProduct; // Change of a +N image
    }
  }

  // This function is called to show the battle screen,
  // hide the prebattle screen and begin the battle clock
  $scope.startBattle = function() {
    $scope.battleStarted = true;
    $scope.battleFinished = false;
    $scope.time = 10;
    $scope.chooseProducts(0,1);
    $scope.i = 2;
    $scope.moves = +$scope.productList.length / 2;
    $scope.productsOnScreen = [$scope.productList[0], $scope.productList[1]];
  }

  // This function reduces the battle clock by one each second
  // while all products have not been cycled through 
  $interval(function() {
    if(!$scope.battleFinished && $scope.battleStarted) {
      $scope.time = +$scope.time - 1;
      if($scope.time == 0) {
        if($scope.i < $scope.productList.length) {
          $scope.newMove();
        } else {
          $scope.battleFinished = true;
          $scope.battleOver();
        }
      }
    }
  }, 1000);

  // This function changes the products stored in the productsOnScreen array to the product indeces passed
  // pre: all the indeces passed must be >= 0 and < productList.length and none of them can be the same index
  // post: the products on screen will be the products with the indeces passed
  $scope.chooseProducts = function(p1, p2, p3, p4) {
    $scope.productsOnScreen = [$scope.productList[p1], $scope.productList[p2]];
  };

  // This function increases the count of the chosen product by 1 and loads a new set of products to choose from
  // pre: index must be >= 0 and < productList.length
  // post: A new group of products will be displayed to choose from and the clicked upon product will have a count increased by 1  
  $scope.update = function(product) {
    var index = $scope.productList.indexOf(product);
    $scope.productList[index].count = (+$scope.productList[index].count + 1);
    console.log("index: " + index + "\n product:" + product.name);
    if($scope.i < $scope.productList.length) {
      $scope.newMove();     
    } else {
      $scope.battleOver();
      $scope.battleFinished = true;

    }
  };

  $scope.newMove = function() {
    $scope.time = 10;
    $scope.moves = +$scope.moves - 1;
    $scope.chooseProducts($scope.i, +$scope.i + 1);
    $scope.i = (+$scope.i + 2);
  };

  $scope.battleOver = function() {
    $scope.time = 0;
    $scope.moves = +$scope.moves - 1;
    $scope.productsOnScreen = [$scope.displayWhenFinished, $scope.displayWhenFinished2];

  }

}]);

// app.run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       // for form inputs)
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       // Don't remove this line unless you know what you are doing. It stops the viewport
//       // from snapping when text inputs are focused. Ionic handles this internally for
//       // a much nicer keyboard experience.
//       cordova.plugins.Keyboard.disableScroll(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })

