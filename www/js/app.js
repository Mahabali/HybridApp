// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function () {
    var app = angular.module('starter', ['ionic', 'Cingo.controllers', 'Cingo.services'])

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
                
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('signUp', {
                    url: '/signUp',
                    templateUrl: 'templates/signUp.html',
                    controller: 'SignUpController'
                })
                .state('signIn', {
                    url: '/signIn',
                    templateUrl: 'templates/signIn.html',
                    controller: 'SignInController'
                })
                .state('home', {
                    url: '/',
                    templateUrl: '/templates/signUp.html',
                })
                .state('tabs', {
                    url: '/tabs',
                    abstract: true,
                    templateUrl: "templates/tabs.html"
                })
                .state('tabs.vendors', {
                    url: '/vendors',
                    
                    views: {
                        'Vendors': {
                            templateUrl: 'templates/vendors.html',
                            controller:'VendorController'
                        }
                    }
                })
                

                .state('tabs.requests', {
                    url: '/requests',
                    views: {
                        'Requests': {
                            templateUrl: 'templates/requests.html',
                            controller: 'RequestsController'
                            
                        }
                    }
                })
                .state('tabs.newVendors', {
                    url: '/newVendors',
                    views: {
                        'Vendors': {
                            templateUrl: 'templates/addNewVendor.html',
                            controller: 'addVendorController'
                            
                        }
                    }
                })
                
                .state('tabs.newRequests', {
                    url: '/newRequest',
                    views: {
                        'Requests': {
                            templateUrl: 'templates/addNewRequest.html',
                            controller: 'addRequestController'
                            
                        }
                    }
                })
                    .state('tabs.customSettings', {
                    url: '/customSettings',
                    views: {
                        'Vendors': {
                            templateUrl: 'templates/customSettings.html',
                            controller: 'CustomSettingsController'
                            
                        }
                    }
                })
                .state('tabs.settings', {
                    url: '/settings',
                    views: {
                        'Settings': {
                            templateUrl: 'templates/settings.html',
                            controller:'SettingsController'
                        }
                    }
                });
        $urlRouterProvider.otherwise('/signUp');
    });
    
    // Wait for Cordova to load
    
}());