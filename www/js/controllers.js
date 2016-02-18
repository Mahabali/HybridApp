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