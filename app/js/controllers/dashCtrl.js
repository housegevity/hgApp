'use strict';

angular.module('hgApp.controller.dashCtrl', [])

.controller('dashCtrl', function ($rootScope, $scope, $http, $location, $routeParams, propertyManager) {
  //Show Popover 
  $scope.showPopover = function () {
    $('#noticationStatus').popover();
  };

  $scope.listProperties = function (event, user) {
    $scope.allProperties = propertyManager.list(user);
  };

  $scope.showNewPropertyModal = function () {
    $('#addPropertyModal').modal('show');
  };

  $scope.uploadOnboardDocuments = function (inputData) {
    $scope.newDocData = inputData;
    console.log($scope.newDocData);
    $scope.StepOne = false;
  };

  if ($rootScope.auth.user) {
    $scope.listProperties(null, $rootScope.auth.user);
  } else {
    // Initialize the scope, only if the user has logged in.
    $scope.$on("$firebaseSimpleLogin:login", $scope.listProperties);
  }
});