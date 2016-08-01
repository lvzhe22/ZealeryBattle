// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

// This Controller is connected to the body of the Battle App Page.
// The user can see the products that they will see in the battle. (Pre-Battle)
// They will choose between two products for a certain number of moves during the battle. (In-Battle)
// They will see the new rank of the products after the battle. (Post-Battle)
app.controller('ctrl', ['$scope' , '$interval', function($scope, $interval) {

  // Initial Conditions
  $scope.listItems = 2; // number of products on screen
  $scope.i = 2;

  $scope.productList = [ // Proxy List of Products
    productOne = {
      name : "Plain White T",
      image : "img/image1.jpg",
      index : 0,
      count : 0
    },

    productTwo = {
      name : "V-Neck T-Shirt",
      image : "img/image2.jpg",
      index : 1,
      count : 0
    },

    productThree = {
      name : "Flannel Shirt",
      image : "img/image3.jpg",
      index : 2,
      count : 0
    },

    productFour = {
      name : "Long-Sleeve Shirt",
      image : "img/image4.jpg",
      index : 3,
      count : 0
    }
  ];

  // Displays the number of extra products on the Pre-Battle Screen.
  // Image is pulled from the website who's address can be changed to display a different number.
  $scope.dummyProduct = {
    name: "extra products",
    image: "http://dummyimage.com/150x200/91fffb/fff.png&text=0x2B+" + (+$scope.productList.length - 2),
    index: -3,
    count: 0
  }

  // HEADER DATA

  $scope.user = {
    name : "John Doe",
    profilePicture : "img/image0.jpg",
    score : 150
  }

  $scope.moves = +$scope.productList.length / 2;

  // This function is called when the user taps the exit button in the upper right corner
  // The Pre-Battle Screen is shown and the moves are reset.
  $scope.exit = function() {
    console.log("exit clicked");
    $scope.battleStarted = false;
    $scope.battleFinished = false;
    $scope.moves = +$scope.productList.length / 2;
  };

  // PRE-BATTLE SCREEN
  // This function shows the products that will be displayed before the battle starts
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

  // This function will show the battle screen, hide the prebattle screen, and begin the battle clock.
  // It also resets all necesary initial conditions.
  $scope.startBattle = function() {
    $scope.battleStarted = true;
    $scope.battleFinished = false;
    $scope.time = 10;
    $scope.i = 2;
    $scope.moves = +$scope.productList.length / 2;
    $scope.chooseProducts(0,1);
  }

  // This function reduces the battle clock by one each second until all products are cycled through
  // It also triggers any time-based events
  $interval(function() {
    if(!$scope.battleFinished && $scope.battleStarted) {
      $scope.time = +$scope.time - 1;
      if($scope.time == 0) {
        if($scope.i < $scope.productList.length) {
          $scope.newMove();
        } else {
          $scope.battleFinished = true;
          $scope.moveOver();
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
      $scope.battleFinished = true;

    }
  };

  // This function is called every time a new move begins, it sets the preconditions for each move
  $scope.newMove = function() {
    $scope.time = 10;
    $scope.moves = +$scope.moves - 1;
    $scope.chooseProducts($scope.i, +$scope.i + 1);
    $scope.i = (+$scope.i + 2);
  };

  // This function resizes the timer to the width and height of the parameter 'x'
  // pre: This function assumes that the thickness of the border is 2px
  $scope.resizeTimer = function(x, timer) {
    timer.style.height = (x) + 'px';
    timer.style.width = (x) + 'px';
    timer.style.borderRadius = (x) + 'px';
    timer.style.lineHeight = (x - 4) + 'px';
  }

  // This function alters the dimensions of the Content to fit the screen.
  // pre: All the html objects that are part of the inBattle Screen need to be in the document.
  //      This flow structure assumes the screen size is one of the standard iOS pixel sizes.
  //      This function also only works for the inBattle screen.
  $scope.dimensions = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var images = document.getElementsByClassName("inBattleImage");
    var timer = document.getElementById("timerList");
    var p0 = document.getElementById('product0');
    var p1 = document.getElementById('product1');

    timer.style.top = 85 + 'px';
    $scope.resizeTimer(100 , document.getElementById('timer'));
    p0.style.marginRight = 70 + 'px';
    p1.style.marginLeft = 70 + 'px';
    for(i = 0; i < images.length; i++) {
      images[i].style.height = 210 + 'px';
      images[i].style.width = 140 + 'px';
    }

    if(width > 600) {
      timer.style.top = 30 + 135 - 50 + 'px';
      p0.style.marginRight = 75 + 'px';
      p1.style.marginLeft = 75 + 'px';
      for(i = 0; i < images.length; i++) {
        images[i].style.height = 270 + 'px';
        images[i].style.width = 180 + 'px';
      }

      if(height > 500) {
        timer.style.top = 30 + 375/2 - 125/2 + 'px';
        $scope.resizeTimer(2 * 2 * 125 /3, document.getElementById('timer'));
        p0.style.marginRight = 125 + 'px';
        p1.style.marginLeft = 125 + 'px';
        for(i = 0; i < images.length; i++) {
          images[i].style.height = 375 + 'px';
          images[i].style.width = 250 + 'px';
        }
      }
    }
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
