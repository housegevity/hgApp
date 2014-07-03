/* global angular, _ */
'use strict';

/* Controllers */
angular.module('hgApp.controller.propertyCtrl', ['firebase'])
  .controller('propertyCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$log', 'propertyManager', 'allChecklists', 'checklistsFlow', 'checklistsManager',
    function ($rootScope, $scope, $state, $stateParams, $log, propertyManager, allChecklists, checklistsFlow, checklistsManager) {
      $scope.property = null;
      $scope.taskStatuses = {};
      $scope.allChecklists = allChecklists;

      if ($stateParams.checklistName) {
        checklistsManager.findChecklist($stateParams.checklistName).then(function (data) {
          $scope.masterChecklist = data;
        });
      }

      if (!$scope.nextChecklist) {
        for (var i = 0; i < checklistsFlow.length; i++) {
          if (checklistsFlow[i] === $stateParams.checklistName) {
            $scope.nextChecklist = checklistsFlow[i + 1] || 'dash';
          }
        }
      }

      $scope.findProperty = function (event, user) {
        $scope.propertyRef = propertyManager.get(user, $stateParams.propertyID);
        $scope.propertyRef.$on('loaded', function (data) {
          $scope.property = data;
          angular.forEach($scope.masterChecklist.tasks, function (task, idx) {
            var completedChecklist = $scope.property.checklists[$scope.masterChecklist.id];
            if (completedChecklist.tasks.indexOf(task.name) !== -1) {
              $scope.taskStatuses[task.name] = true;
            }
          });
          
        });

      };

      $scope.updateChecklistProgress = function () {
        var completedTasks = [];
        angular.forEach($scope.taskStatuses, function (isDone, taskName) {
          if (isDone) {
            completedTasks.push(taskName);
          }
        });
        $scope.property.checklists[$scope.masterChecklist.id].tasks = completedTasks;
        $log.info($scope.property.checklists[$scope.masterChecklist.id].tasks);
        propertyManager.save($rootScope.auth.user, $scope.property);
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