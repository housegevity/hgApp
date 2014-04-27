'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.config',
  'waitForAuth', // This is used for showing login button or not
  'authSecurity',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.dashCtrl',
  'myApp.propertyCtrl'
]).
config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.
  when('/home',
    {
      templateUrl: 'views/home.html'
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

}])

.run(['loginService', '$rootScope', 'FBURL', function (loginService, $rootScope, FBURL) {
  // establish authentication
  $rootScope.auth = loginService.init();
  $rootScope.FBURL = FBURL;
}]);
