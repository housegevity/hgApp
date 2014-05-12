'use strict';

angular.module('hgApp.controller.dashCtrl', [])

.controller('dashCtrl', function ($rootScope, $scope, $http, $location, $routeParams, propertyManager) { 
  //Show Popover 
  $scope.showPopover = function(){
      $('#noticationStatus').popover();
  };

  // Initialize the scope, only if the user has logged in.
  $scope.$on("$firebaseSimpleLogin:login", function (err) {
    var user = $rootScope.auth.user;
    $scope.allProperties = propertyManager.list(user);

    for (var i = 0; i < $scope.allProperties.length; i += 1) {
      $scope.sum = $scope.allProperties[i].notifications.length;
      console.log($scope.sum);
    };
  });

  $scope.showNewPropertyModal = function() {
      $('#addPropertyModal').modal('show');
  }

  $scope.uploadOnboardDocuments = function(inputData) {
    $scope.newDocData = inputData;
    console.log($scope.newDocData);
    $scope.StepOne = false;
  };
});