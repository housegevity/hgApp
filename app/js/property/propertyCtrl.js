'use strict';

/* Controllers */
angular.module('hgApp.propertyCtrl', ['firebase'])

.controller('propertyCtrl', function ($scope, $location, $routeParams, $http, ownReqs, documents) {

  $scope.selectedTab = 1;
  $scope.ownReqs = ownReqs;

  //GRAB THE NESCESSARY JSON DATA
  $http.get('data/all_properties.json').success(function(data) {
      $scope.all_properties = data;
      $scope.all_propertiesLength = $scope.all_properties.length;
      $scope.selectedProperty = $scope.all_properties[$routeParams.propertyID - 1]
  });

  $http.get('data/all_required_docs.json').success(function(data) {
      $scope.required_docs = data;
  });

  $http.get('data/presummer_notifications.json').success(function(data) {
      $scope.presummer_notifications = data;
      $scope.presummer_notificationsLength = $scope.presummer_notifications.length;
  });

  $http.get('data/prewinter_notifications.json').success(function(data) {
      $scope.prewinter_notifications = data;
      $scope.prewinter_notificationsLength = $scope.prewinter_notifications.length;
  });

  $http.get('data/quarterly_notifications.json').success(function(data) {
      $scope.quarterly_notifications = data;
      $scope.quarterly_notificationsLength = $scope.quarterly_notifications.length;
  });

  $http.get('data/annual_notifications.json').success(function(data) {
      $scope.annual_notifications = data;
      $scope.annual_notificationsLength = $scope.annual_notifications.length;
  });

  //UI CONTROLS
  $scope.selectedTab = 1;
  $scope.selectedDocID = null;    
  
  $scope.setSelected = function (selectedDocID) {
      $scope.selectedDocID = selectedDocID;
      console.log("document category selected")
  };

  $scope.addDocument = function () {
      $('#documentModal').modal('show');
  };

})