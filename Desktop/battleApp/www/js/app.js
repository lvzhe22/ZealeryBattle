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

  $scope.displayWhenFinished = {
    name : "Congratulations!",
    image : "img/image-1.jpg",
    index : -1,
    count : 0
  };

  $scope.displayWhenFinished2 = {
    name : "Congratulations!",
    image : "img/image-1.jpg",
    index : -2,
    count : 0
  };

  $scope.dummyProduct = {
    name: "extra products",
    image: "http://dummyimage.com/150x200/91fffb/fff.png&text=0x2B+" + (+$scope.productList.length - 2),
    index: -3,
    count: 0
  }

  // HEADER DATA

  // USER DATA
  $scope.name = "John Doe";

  $scope.profilePicture = "img/image0.jpg";

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

  // This function is called every time a new move begins
  $scope.newMove = function() {
    $scope.time = 10;
    $scope.moves = +$scope.moves - 1;
    $scope.chooseProducts($scope.i, +$scope.i + 1);
    $scope.i = (+$scope.i + 2);
  };

  // This function is called every time the player runs out of moves
  $scope.battleOver = function() {
    $scope.time = 0;
    $scope.moves = +$scope.moves - 1;
    $scope.productsOnScreen = [$scope.displayWhenFinished, $scope.displayWhenFinished2];

  }

  $scope.resizeTimer = function(x, timer) {
    //timer.style.fontSize = x + 'px';
    console.log(x);
    timer.style.height = (x) + 'px';
    timer.style.width = (x) + 'px';
    timer.style.borderRadius = (x) + 'px';
    timer.style.lineHeight = (x - 4) + 'px';
  }

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






  // This function allows the images to scale depending on the screen
  // $scope.dimensions = function() {
  //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  //   var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  //   var headerHeight = document.getElementById("header").clientHeight;
  //   var effectiveH = height - (headerHeight * 4);
  //   var images = document.getElementsByClassName("image");
  //   var timer = document.getElementById("timerList");
  //   var timerText = document.getElementById("timer");
  //   var spacer = document.getElementById("spacer").style.top;
  //   spacer = 50;

  //   if(effectiveH > 400) {
  //     for(i = 0; i < images.length; i++){
  //       images[i].style.height = effectiveH / 2 + 'px';
  //       images[i].style.width = (effectiveH / 3) + 'px';
  //       console.log(spacer);
  //       timer.style.top = (spacer + (effectiveH /4)) + 'px';
  //     }
  //     $scope.resizeTimer(35, timerText);
  //   } else {
  //     if((width / 2) >= effectiveH) {
  //       // Set image sizes by height
  //       for(i = 0; i < images.length; i++){
  //         images[i].style.height = effectiveH + 'px';
  //         images[i].style.width = ((effectiveH / 3)* 2) + 'px';
  //         timer.style.top = (spacer + (effectiveH / 2)) + 'px';
  //       }
  //       if(effectiveH < 200) {
  //         $scope.resizeTimer(15, timerText);
  //         console.log(spacer + (effectiveH / 2)); 
  //       } else{
  //         $scope.resizeTimer(35, timerText);
  //       }
  //     } else {
  //       // Set image sizes by width
  //       for(i = 0; i < images.length; i++){
  //         images[i].style.width = width/6 + 'px';
  //         images[i].style.height = (width / 6) * 2 + 'px';
  //         timer.style.top = (spacer + (effectiveH /4)) + 'px';
  //       }
  //       $scope.resizeTimer(15, timerText);
  //     }
  //     $scope.$apply();
  //     var margin = (width - 2 * width/6 - timerText.style.width) / 2
  //     window.onload = function() {  
  //       document.getElementById("product0").style.marginRight = margin + 'px';
  //       document.getElementById("product1").style.marginLeft = margin + 'px';
  //     }
  //   }
  //  }



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

