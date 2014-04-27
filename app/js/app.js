'use strict';


// Declare app level module which depends on filters, and services
angular.module('hgApp', [
  'ngRoute',
  'firebase',
  'google',
  'waitForAuth',
  'authSecurity',
  'hgApp.config',
  'hgApp.filters',
  'hgApp.services',
  'hgApp.directives',
  'hgApp.loginCtrl',
  'hgApp.dashCtrl',
  'hgApp.propertyCtrl'
]).
config(['$routeProvider', function ($routeProvider) {
  
  $routeProvider.
  when('/home',
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

}])

// Configure Google APIs
.config(['googleApiProvider', 'GAPIKEY', function (googleApiProvider, GAPIKEY) {
  googleApiProvider.configure(GAPIKEY);
}])

// Configure the Firebase authentication
.run(['loginService', '$rootScope', 'FBURL', function (loginService, $rootScope, FBURL) {
  // establish authentication
  $rootScope.auth = loginService.init();
  $rootScope.FBURL = FBURL;
}]);
