'use strict';


// Declare app level module which depends on filters, and services
angular.module('hgApp', [
  'ngRoute',
  'firebase',
  'hgApp.config',
  'waitForAuth',
  'authSecurity',
  'hgApp.filters',
  'hgApp.services',
  'hgApp.directives',
  'hgApp.dashCtrl',
  'hgApp.propertyCtrl'
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
