'use strict';

/* Controllers */
angular.module('hgApp.controller.propertyCtrl', ['firebase'])
  .controller('propertyCtrl', ['$rootScope', '$scope', '$stateParams', '$log', 'propertyManager',
    function ($rootScope, $scope, $stateParams, $log, propertyManager) {
      $scope.property = null;

      $scope.findProperty = function (event, user) {
        propertyManager.get(user, $stateParams.propertyID).then(function (data) {
          $scope.property = data;
          $log.info("Property: ", $scope.property);
        });
      };

      $scope.addNewProperty = function (newProperty) {
        $scope.property = angular.copy(newProperty);
        $scope.property.dateAdded = new Date();

        // TODO Upload photos

        // Save the proeprty to firebase
        propertyManager.save($rootScope.auth.user, $scope.property);
        $scope.property = null;
        $('#addPropertyModal').modal('hide');
      };

      
      if ($stateParams.propertyID) {
        if ($rootScope.auth.user) {
          return $scope.findProperty(null, $rootScope.auth.user)
        } else {
          // Initialize the scope, only if the user has logged in.
          $scope.$on("$firebaseSimpleLogin:login", $scope.findProperty);
        }
      }
    }
  ]);