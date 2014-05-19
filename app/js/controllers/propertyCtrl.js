'use strict';

/* Controllers */
angular.module('hgApp.controller.propertyCtrl', ['firebase'])
  .controller('propertyCtrl', ['$rootScope', '$scope', '$stateParams', '$log', 'checklistsManager', 'propertyManager',
    function ($rootScope, $scope, $stateParams, $log, checklistsManager, propertyManager) {
      $scope.property = null;
      $scope.imageFile = null;

      // TODO Move this to resolve      
      checklistsManager.getAllChecklists().$on('loaded', function (data) {
        $scope.allChecklists = data;
      });

      $scope.onImageSelect = function ($files) {
        $scope.imageFile = $files[0];
      }

      $scope.uploadImage = function () {
        var user = $rootScope.auth.user;

        if ($scope.imageFile) {
          propertyManager.upload(user, $scope.imageFile);
          $scope.imageFile = null;
        }
      }

      $scope.findProperty = function (event, user) {
        $scope.propertyRef = propertyManager.get(user, $stateParams.propertyID);

        $scope.propertyRef.$on('loaded', function (data) {
          $scope.property = data;

          // Calculate total completed tasks.
          $scope.property.completedTasks = 0;
          angular.forEach($scope.property.checklists, function (v, k) {
            angular.forEach(v.tasks, function (tv, tk) {
              $scope.property.completedTasks++;
            });
          });
        });
      };

      $scope.updateChecklistProgress = function () {
        $scope.propertyRef.$save().then(function (data) {
          $log.info("Saved property");
          $scope.findProperty(null, $rootScope.auth.user)
        });
      }

      $scope.addNewProperty = function (newProperty) {
        var property = angular.copy(newProperty);
        property.dateAdded = new Date().getTime();

        // Save the proeprty to firebase
        propertyManager.save($rootScope.auth.user, property, function (obj) {
          $log.info(obj);
        });
      };

      if ($stateParams.propertyID) {
        if ($rootScope.auth.user) {
          return $scope.findProperty(null, $rootScope.auth.user)
        } else {
          // Initialize the scope, only if the user has logged in.
          $scope.$on("$firebaseSimpleLogin:login", $scope.findProperty);
        }
      } else {
        $scope.addPropertyStatus = true;
      }
    }
  ]);