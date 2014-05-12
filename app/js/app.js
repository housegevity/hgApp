'use strict';

// Declare app level module which depends on filters, and services
angular.module('hgApp', [
  // Libs / modules
  'ngRoute',
  'firebase',
  'angularFileUpload',
  'angular-gapi',
  'ui.router',
  'waitForAuth',
  'authSecurity',
  'ng-shortId',
  
  // Configuration
  'hgApp.config',

  // Filters
  'hgApp.filters',

  // Services
  'hgApp.service.login',
  'hgApp.service.firebase',
  'hgApp.service.propertyManager',
  'hgApp.service.documentManager',
  'hgApp.service.testData', // Temporary for testing only

  // Directives
  'hgApp.directives.version',

  // Controllers
  'hgApp.controller.loginCtrl',
  'hgApp.controller.dashCtrl',
  'hgApp.controller.docCtrl',
  'hgApp.controller.propertyCtrl'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      authRequired: true, // must authenticate before viewing this page
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'loginCtrl'
    })
    .state('dash', {
      authRequired: true, // must authenticate before viewing this page
      url: '/dash',
      templateUrl: 'views/dash/dashboard.html',
      controller: 'dashCtrl'
    })
    .state('docs', {
      url: '/docs',
      templateUrl: 'views/docs/upload.html',
      controller: 'docCtrl'  
    })
    .state('property', {
      authenticated: true,
      url: '/property/:propertyID',
      templateUrl: 'views/property.html',
      controller: 'propertyCtrl'
    })
})
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
