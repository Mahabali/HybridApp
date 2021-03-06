/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('Cingo.controllers',[])

.controller('SignUpController',function($scope,$state,DBService,$ionicPlatform){
    $ionicPlatform.ready(function() {
        console.log("Init DB");
        DBService.initDB();
    });
    $scope.signUp= function(signupForm,user,confirmPassword){
        console.log("signup tapped");
        if (signupForm.email.$invalid){
             console.log("invalid email");
            $scope.formError = "Invalid Email Id";
            $scope.shouldShowError = true;
        }
        else if (signupForm.password.$invalid){
             console.log("invalid password");
            $scope.formError = "Password should be greater than 6 characters";
            $scope.shouldShowError = true;        
        }
        else if (user.password !== confirmPassword){
             console.log("Password != Confirm Password" + JSON.stringify(signupForm.password) + " "+JSON.stringify(signupForm.confirmPassword));
            $scope.formError = "Passwords don't match. Try again";
            $scope.shouldShowError = true;        
        }
        else{
             console.log("valid");
             DBService.addUser(user);
             $scope.shouldShowError = false;              
             $state.go('tabs.vendors');
        }
       
    };
    $scope.signIn = function(){
      $state.go('signIn');
    };
    
})

.controller('SignInController',function($scope,$ionicHistory,$state){
    $scope.signIn= function(signinForm,user){
        if (signinForm.email.$invalid){
             console.log("invalid email");
            $scope.formError = "Invalid Email Id";
            $scope.shouldShowError = true;
        }
        else if (signinForm.password.$invalid){
             console.log("invalid password");
            $scope.formError = "Password should be greater than 6 characters";
            $scope.shouldShowError = true;        
        }
        else{
             $state.go('tabs.vendors');
        }
        console.log("signIn tapped"+user.email);
    };
     $scope.signUp= function(user){
        $ionicHistory.goBack();
        console.log("signIn tapped"+user.email);
    };
})

.controller('VendorController',function($scope,$state,DBService){
    
    $scope.initialize = function(){
          console.log("vendor initialized");
          
    }
    $scope.addNewVendor= function(){
         console.log("vendor tapped");
        $state.go('tabs.newVendors');
       
    };

})

.controller('RequestsController',function($scope,$state,DBService,$filter){
    
    $scope.initialize = function(){
     
          console.log("requestsInitializeds");
          $scope.requests = [];
          DBService.getRequest(function(result){
              
              $scope.request = result;
              $scope.request.requestFormattedDate = $filter('date')(new Date(),'MMMM dd,yyyy hh:mm a');
          });
      };
    $scope.addNewRequests= function(){
         console.log("vendor tapped");
        $state.go('tabs.newRequest');
       
    };

})
.controller('addRequestController',function($scope,$state,DBService,$ionicHistory){
    
    $scope.initialize = function(){
          console.log("requestsInitialized initialized");
               calculateAvailableTimeOptions();
          function calculateAvailableTimeOptions(){
                 var d = new Date();
                 var minutes = d.getMinutes();
                 var roundoffMinutes = 10 - (minutes%10);
                 var timeOtpions = ["ASAP"];
                 for (i = 0; i < 5;i++){
                 var newDateObj = new Date(d.getTime() + ((i+1)*20)*60000 + (roundoffMinutes * 60000));
                 var formattedMinutes = newDateObj.getMinutes() < 10 ? ("0"+newDateObj.getMinutes()):newDateObj.getMinutes();
                 var formattedHours = newDateObj.getHours() > 12 ? (newDateObj.getHours()-12):newDateObj.getHours();
                 var ampm = newDateObj.getHours() > 12 ? "pm":"am";
                 var newTimeOption = formattedHours + ":" + formattedMinutes+ " "+ampm;
                 timeOtpions.push(newTimeOption);
              }
              $scope.timeOptions = timeOtpions;
                 console.log("time options  "+ JSON.stringify(timeOtpions));
          }
          
          $scope.vendors = ["Target","SilverCar","HomeAway","DirectTV","macy's"];
          $scope.departments = ["General","Bookings"];
          $scope.request = {};
          $scope.request.vendor = $scope.vendors[0];
          $scope.request.callbackTime = $scope.timeOptions[1];
          $scope.request.department = $scope.departments[0];
    };
    $scope.addNewRequest= function(newRequestForm,request){
         console.log("new requests" + JSON.stringify(request));
         request.status = "Queued";
         request.requestCreatedDate = new Date();
         DBService.createNewRequest(request);
         alert('Request Created');
          $ionicHistory.goBack();
    };
    $scope.goBack = function(){
        $ionicHistory.goBack();
    }

})
.controller('SettingsController',function($scope,$state,DBService){
     $scope.$on('$ionicView.enter', function() {
  DBService.getGlobalSettings(function(result){
      $scope.user = result;
      
  });
   console.log("user JSON "+JSON.stringify($scope.user));
});
$scope.onPasswordChange = function(password){
    if (DBService.checkIfPasswordChanged(password) ){
        console.log("password not changed");
    $scope.passwordChanged = false;
}
else{
    console.log("password changed");
     $scope.passwordChanged = true;
    
}
};
        $scope.initialize =function(){
        console.log("initialize settings");
   
};
   $scope.saveSettings= function(settingsForm,user,confirmPassword){
        console.log("signup tapped");
        
        if (settingsForm.email.$invalid){
             console.log("invalid email");
            $scope.formError = "Invalid Email Id";
            $scope.shouldShowError = true;
        }
        else if (settingsForm.password.$invalid){
             console.log("invalid password");
            $scope.formError = "Password should be greater than 6 characters";
            $scope.shouldShowError = true;        
        }
        else if ($scope.passwordChanged && user.password !== confirmPassword){
            $scope.formError = "Passwords don't match. Try again";
            $scope.shouldShowError = true;        
        }
        else{
             console.log("valid");
             DBService.setGlobalSettings(user);
             $scope.user = user;
             $scope.shouldShowError = false;              
             alert('User Saved');
        }
       
    };
$scope.logout = function(){
   // DBService.setGlobalSettings("");
}


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
})
.controller('tabBarController',function($scope,$ionicHistory){
    $scope.settingsTapped= function(){
        console.log("Settings tapped");
    };
     
})

  .controller('viewRequestController',function($scope,$ionicHistory){
    $scope.signIn= function(user){
        console.log("signIn tapped"+user.email);
    };
     $scope.signUp= function(user){
        $ionicHistory.goBack();
        console.log("signIn tapped"+user.email);
    };
})
;
