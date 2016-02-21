/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('Cingo.controllers',[])

.controller('SignUpController',function($scope,$state){
    $scope.signUp= function(user){
        console.log("signup tapped");
         $state.go('tabs.vendors');
    };
    $scope.signIn = function(){
      $state.go('signIn');
    };
    
})

.controller('SignInController',function($scope,$ionicHistory){
    $scope.signIn= function(user){
        console.log("signIn tapped"+user.email);
    };
     $scope.signUp= function(user){
        $ionicHistory.goBack();
        console.log("signIn tapped"+user.email);
    };
})

.controller('VendorController',function($scope,$state){
    $scope.addNewVendor= function(){
         console.log("vendor tapped");
        $state.go('tabs.newVendors');
       
    };

})

.controller('addVendorControllers',function($scope,$ionicHistory){

    $scope.vendors=[{name:"Target",image:""},{name:"HomeAway",image:""},{name:"SilverCar",image:""},{name:"DirectTV",image:""},{name:"macy's",image:""}]
    $scope.goBack= function(){
         console.log("vendor tapped");
       $ionicHistory.goBack();
       
    };
    
 })
 
 .controller('addVendorController', function($scope, $ionicScrollDelegate, $location, $anchorScroll,$ionicHistory,$state) {
  var letters = $scope.letters = [];
  var vendors = $scope.vendors = [];
  var currentCharCode = ' '.charCodeAt(0) - 1;
   var vendorsList=[{name:"Target",image:""},{name:"HomeAway",image:""},{name:"SilverCar",image:""},{name:"DirectTV",image:""},{name:"macy's",image:""}]
    $scope.goBack= function(){
       $ionicHistory.goBack();
       
    };
    $scope.clearSearch = function() {
    $scope.search = '';
    console.log("clear searched");
  };
  //window.CONTACTS is defined below
  vendorsList
    .sort(function(a, b) {
      return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    })
    .forEach(function(vendor) {
      //Get the first letter of the last name, and if the last name changes
      //put the letter in the array
      var vendorCharCode = vendor.name.toUpperCase().charCodeAt(0);
      if (vendorCharCode < 65) {
         vendorCharCode = 35; 
      }
   
      //We may jump two letters, be sure to put both in
      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
      var difference = vendorCharCode - currentCharCode;

      for (var i = 1; i <= difference; i++) {
        addLetter(currentCharCode + i);
      }
      currentCharCode = vendorCharCode;
      vendors.push(vendor);
    });

  //If names ended before Z, add everything up to Z
  for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
    addLetter(i);
  }

  function addLetter(code) {
    var letter = String.fromCharCode(code);

    vendors.push({
      isLetter: true,
      letter: letter
    });
   
    letters.push(letter);
  };

  //Letters are shorter, everything else is 52 pixels
  $scope.getItemHeight = function(item) {
    return item.isLetter ? 40 : 100;
  };


  var letterHasMatch = {};
  $scope.getVendors = function() {
    letterHasMatch = {};
    //Filter contacts by $scope.search.
    //Additionally, filter letters so that they only show if there
    //is one or more matching contact
    return vendors.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||
        item.name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ;

      //console.log(item.last_name.toString().charAt(0));
      
      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {

        var letter = item.name.charAt(0).toUpperCase();
        if ( item.name.charCodeAt(0) < 65 ){
          letter = "#";
        }
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    }).filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't
      //have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      
      return true;
    });
  };
  $scope.addVendor = function(item){
      $state.go('tabs.customSettings');
  };
})

  .controller('CustomSettingsController',function($scope,$ionicHistory){
    $scope.signIn= function(user){
        console.log("signIn tapped"+user.email);
    };
     $scope.signUp= function(user){
        $ionicHistory.goBack();
        console.log("signIn tapped"+user.email);
    };
});