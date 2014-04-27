'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.config',
  // 'waitForAuth', - Enable this later if you want to hide login button
  'authSecurity',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.dashCtrl',
  'myApp.loginCtrl',
  'myApp.propertyCtrl'
]).
config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/home',
    {
      templateUrl: 'views/home.html',
      controller: 'loginCtrl'
    }
  ).
  when('/dash',
    {
      authRequired: true, // must authenticate before viewing this page
      templateUrl: 'views/dash/dashboard.html',
      controller: 'dashCtrl'
    }
  ).
  when('/property/:propertyID', 
    {
      authRequired: true, // must authenticate before viewing this page
      templateUrl: 'views/dash/property.html',
      controller: 'propertyCtrl'
    }
  ).
  otherwise(
    {
      redirectTo: '/home'
    }
  );

}]);
