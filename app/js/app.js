'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/home',
  	{
  		templateUrl: 'views/home.html',
  		//controller: 'homeCtrl'
  	});

  $routeProvider.when('/dash',
    {
      templateUrl: 'views/dash/dashboard.html',
      //controller: 'dashCtrl'
    });

  $routeProvider.when('/dash/settings', 
  	{
  		templateUrl: 'views/dash/settings.html', 
  		controller: 'settingCtrl'
  	});

  $routeProvider.otherwise(
    {
      redirectTo: '/home'
    });

}]);
