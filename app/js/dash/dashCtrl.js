'use strict';

angular.module('hgApp.dashCtrl', [])

.controller('dashCtrl', function ($rootScope, $scope, $http, $location, $routeParams, propertyManager, buyReqs, ownReqs) { 
  var user = $rootScope.auth.user;

  //Show Popover 
  $scope.showPopover = function(){
      $('#noticationStatus').popover();
  };

  //GRAB THE DATA DEPENDENCY INJECTIONS
  $scope.ownReqs = ownReqs;

  $scope.allProperties = propertyManager.list();

  for (var i = 0; i < $scope.allProperties.length; i += 1) {
    $scope.sum = $scope.allProperties[i].notifications.length;
    console.log($scope.sum);
  };

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
    $('#addProperty').modal('hide');
    $('#new_property_onboard').modal('show');
    $scope.newPropertyData = inputData;
    propertyManager.save(inputData);

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