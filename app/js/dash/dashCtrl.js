'use strict';

angular.module('myApp.dashCtrl', ['firebase'])

.controller('dashCtrl', function ($rootScope, $scope, $firebase, $http, $location, $routeParams, buyReqs, ownReqs) { 
  //Show Popover 
  $scope.showPopover = function(){
      $('#noticationStatus').popover();
  };

  //GRAB THE DATA DEPENDENCY INJECTIONS
  $scope.ownReqs = ownReqs;

  var propertiesRef = new Firebase("https://housegevity.firebaseio.com/properties");
  $scope.all_properties = $firebase(propertiesRef);
  propertiesRef.once('value', onDataLoad);

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

  function onDataLoad(dataSnapshot) {
    $scope.all_properties = dataSnapshot.val();

    for (var i = 0; i < $scope.all_properties.length; i += 1) {
        $scope.sum = $scope.all_properties[i].notifications.length;
        console.log($scope.sum);
    };
  }
});