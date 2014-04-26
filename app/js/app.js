'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
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
      templateUrl: 'views/dash/dashboard.html',
      controller: 'dashCtrl'
    }
  ).
  when('/property/:propertyID', 
    {
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
