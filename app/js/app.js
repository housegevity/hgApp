'use strict';

// Declare app level module which depends on filters, and services
angular.module('hgApp', [
  // Libs / modules
  'ngRoute',
  'firebase',
  'angularFileUpload',
  'angular-gapi',
  'ui.router',
  'ui.bootstrap',
  'waitForAuth',
  'authSecurity',
  'ng-shortId',
  'checklist-model',

  // Configuration
  'hgApp.config',

  // Filters
  'hgApp.filters',

  // Services
  'hgApp.services',
  'hgApp.service.login',
  'hgApp.service.firebase',
  'hgApp.service.propertyManager',
  'hgApp.service.documentManager',

  // Directives
  'hgApp.directives.version',

  // Controllers
  'hgApp.controller.loginCtrl',
  'hgApp.controller.dashCtrl',
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
      controller: 'dashCtrl',
      resolve: {
        allChecklists: function (checklistsManager) {
          return checklistsManager.getAllChecklists();
        }
      }
    })
    .state('healthcheck', {
      authenticated: true,
      url: '/property/:propertyID/healthcheck',
      abstract: true,
      templateUrl: 'views/property/property.html'
    })
    .state('healthcheck.checklists', {
      authenticated: true,
      url: '/{checklistName:monthly|seasonal-summer|seasonal-winter|annual}', // TODO make this dynamic
      templateUrl: 'views/property/_healthcheck.html',
      controller: 'propertyCtrl',
      resolve: {
        allChecklists: function (checklistsManager) {
          return checklistsManager.getAllChecklists();
        },
        checklistsFlow: function () {
          // TODO make this dynamic
          return ['monthly', 'seasonal-summer', 'seasonal-winter', 'annual'];
        }
      }
    })
    .state('addProp', {
      authenticated: true,
      abstract: true,
      url: '/property/add',
      templateUrl: 'views/dash/dashboard.html',
      controller: 'propertyCtrl',
      resolve: {
        allChecklists: function (checklistsManager) {
          return checklistsManager.getAllChecklists();
        },
        checklistsFlow: function () {
          // TODO make this dynamic
          return ['monthly', 'seasonal-summer', 'seasonal-winter', 'annual'];
        }
      }
    })
    .state('addProp.S1', {
      url: '/step1',
      templateUrl: 'views/dash/_add_property_S1.html'
    })
    .state('addProp.S2', {
      url: '/step2',
      templateUrl: 'views/dash/_add_property_S2.html'
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
