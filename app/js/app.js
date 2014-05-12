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
  'hgApp.controller.propertyCtrl',
  'hgApp.controller.addPropertyCtrl'
])
.config(function ($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise("/home");
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
    .state('addProp', {
      abstract: true,
      url: '/dash/addProp',
      templateUrl: 'views/dash/dashboard.html',
      controller: 'addPropertyCtrl'
    })
    .state('addProp.S1', {
      url: '/step1',
      templateUrl: 'views/dash/_add_property_S1.html',
    })
    .state('addProp.S2', {
      url: '/step2',
      templateUrl: 'views/dash/_add_property_S2.html',
    })
    .state('addProp.S3', {
      url: '/step3',
      templateUrl: 'views/dash/_add_property_S3.html',
    });
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
