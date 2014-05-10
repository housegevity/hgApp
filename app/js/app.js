'use strict';


// Declare app level module which depends on filters, and services
angular.module('hgApp', [
  'ngRoute',
  'firebase',
  'waitForAuth',
  'authSecurity',
  'angularFileUpload',
  'angular-gapi',
  'mgo-angular-wizard',
  'hgApp.config',
  'hgApp.filters',
  'hgApp.services',
  'hgApp.directives',
  'hgApp.loginCtrl',
  'hgApp.dashCtrl',
  'hgApp.docCtrl',
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
  when('/docs',
    {
      authRequired: true,
      templateUrl: 'views/docs/upload.html',
      controller: 'docCtrl'  
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
.config(function (GAPIProvider, GAPIKEY) {
  var handleClientLoad = function ($window) {
    gapi.client.setApiKey(GAPIKEY);
    gapi.auth.init(function () {});
  };

  GAPIProvider.setInitFunction(handleClientLoad);
})

// Configure the Firebase authentication
.run(['loginService', '$rootScope', 'FBURL', function (loginService, $rootScope, FBURL) {
  // establish authentication
  $rootScope.auth = loginService.init();
  $rootScope.FBURL = FBURL;
}]);
