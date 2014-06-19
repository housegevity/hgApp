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
        $scope.totalTasks = 0;
        angular.forEach($scope.allChecklists, function (val, key) {
          angular.forEach(val.tasks, function () {
            $scope.totalTasks++;
          });
        });
      });

      $scope.onImageSelect = function ($files) {
        $scope.imageFile = $files[0];
      };

      $scope.uploadImage = function () {
        var user = $rootScope.auth.user;

        if ($scope.imageFile) {
          propertyManager.upload(user, $scope.imageFile);
          $scope.imageFile = null;
        }
      };

      $scope.findProperty = function (event, user) {
        $scope.propertyRef = propertyManager.get(user, $stateParams.propertyID);

        $scope.propertyRef.$on('loaded', function (data) {
          $scope.property = data;

          // Calculate total completed tasks.
          $scope.completedTasks = 0;
          angular.forEach($scope.property.checklists, function (v, k) {
            angular.forEach(v.tasks, function (tv, tk) {
              $scope.completedTasks++;
            });
          });
          if ($scope.totalTasks > 0) {
            $scope.completedTasksPercentage = Math.round($scope.completedTasks / $scope.totalTasks * 100);
          }
        });
      };

      $scope.updateChecklistProgress = function () {
        $scope.propertyRef.$save().then(function (data) {
          $log.info("Saved property");
          $scope.findProperty(null, $rootScope.auth.user);
        });
      };

      $scope.addNewPropertyOverview = function (newProperty) {
        $rootScope.propertyData = newProperty;
      };

      $scope.addNewProperty = function (newProperty) {
        var propertySpecs = angular.copy(newProperty);
        var property = _.merge($rootScope.propertyData, propertySpecs);        
        property.dateAdded = new Date().getTime();

        // Initial empty checklists
        property.checklists = {};
        angular.forEach($scope.allChecklists, function (val, key) {
          property.checklists[key] = {
            id: key,
            name: val.name,
            lastUpdated: new Date().getTime(),
            tasks: "" // This is a workaround due to Firebase not saving empty arrays.
          };
        });

        // Save the proeprty to firebase
        propertyManager.save($rootScope.auth.user, property);
      };

      if ($stateParams.propertyID) {
        if ($rootScope.auth.user) {
          return $scope.findProperty(null, $rootScope.auth.user);
        } else {
          // Initialize the scope, only if the user has logged in.
          $scope.$on("$firebaseSimpleLogin:login", $scope.findProperty);
        }
      } else {
        $scope.addPropertyStatus = true;
      }
    }
  ]);
