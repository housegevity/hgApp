'use strict';

angular.module('hgApp.dashCtrl', [])

.controller('dashCtrl', function ($rootScope, $scope, $http, $location, $routeParams, propertyManager, buyReqs, ownReqs, documents) { 
  //Show Popover 
  $scope.showPopover = function(){
      $('#noticationStatus').popover();
  };

  $scope.addPropertyStatus = false;

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

  alert($scope.quarterly_notificationsLength);

  $http.get('data/annual_notifications.json').success(function(data) {
      $scope.annual_notifications = data;
      $scope.annual_notificationsLength = $scope.annual_notifications.length;
  });


  //GRAB THE DATA DEPENDENCY INJECTIONS
  $scope.ownReqs = ownReqs;

  $scope.$on("$firebaseSimpleLogin:login", function (err) {
    var user = $rootScope.auth.user;
    $scope.allProperties = propertyManager.list(user);

    for (var i = 0; i < $scope.allProperties.length; i += 1) {
      $scope.sum = $scope.allProperties[i].notifications.length;
      console.log($scope.sum);
    };

  });

  //WATCH THE ROUTE, player
  $scope.currentRoute = $location.url();
  $scope.propertyID = $routeParams.propertyID;

  $scope.addbuyProperty = function() {
      $('#buyCheck').modal('show');
  }

  $scope.addNewPropertyModal = function() {
      $('#addProperty').modal('show');
  }

  $scope.addNewProperty = function(inputData) {
    var user = $rootScope.auth.user;

    $('#addProperty').modal('hide');
    $('#new_property_onboard').modal('show');
    $scope.newPropertyData = inputData;
    propertyManager.save(user, inputData);

    console.log($scope.newPropertyData);
    $scope.StepOne = true;
  };

  $scope.uploadOnboardDocuments = function(inputData) {
    $scope.newDocData = inputData;
    console.log($scope.newDocData);
    $scope.StepOne = false;
  };

  $scope.buyChecklist = function(property) {
      $scope.switchit = 2;
      console.log('param selected')
  };

  $scope.selected = 1;

  $scope.data = {
      selectedTab: 1
  };
});