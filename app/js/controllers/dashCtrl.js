/*global angular */
'use strict';

angular.module('hgApp.controller.dashCtrl', [])

.controller('dashCtrl', function ($log, $rootScope, $scope, $http, $location, $q, $stateParams, checklistsManager, propertyManager) {
  $scope.loadProperties = function (event, user) {
    propertyManager.list(user).$on('loaded', function (data) {
      $scope.numProperties = 0;
      $scope.allProperties = data;

      angular.forEach(data, function (v, k) {
        $scope.numProperties++;
      });

      $scope.$broadcast("userProperties:loaded");
    });
  };

  $scope.checkForNotifications = function (event) {
    $scope.checklistReminders = null;

    // Check each property for completion progress
    angular.forEach($scope.allProperties, function (prop) {
      $log.info("Calculating percentage complete.");
      var numTotalTasks = 0;
      prop.totalTasksCompleted = 0;

      checklistsManager.getAllChecklists().then(function (data) {
        angular.forEach(data, function (masterChecklist, key) {
          var numCompleted = 0;
          var notify = false;
          var reminder = masterChecklist.reminder;
          var completedTasks = prop.checklists[key].tasks;
          var today = new Date();
          var totalTasks = Object.keys(masterChecklist.tasks).length;
          numTotalTasks += totalTasks;

          // 
          // TODO Check if the checklists need to be reset
          //

          // All checklists need to be checked for completion now

          if (completedTasks && completedTasks.length === totalTasks) {
            $log.info("This checklist is already complete.", masterChecklist.displayName);
          } else {
            switch (reminder.type) {
            case 'annually':
              if (reminder.schedule) {
                // Seasonal schedules
                var startDay = reminder.schedule.startDate.day,
                    startMonth = reminder.schedule.startDate.month,
                    endDay = reminder.schedule.endDate.day,
                    endMonth = reminder.schedule.endDate.month;

                if (today.getMonth() > startMonth && today.getDay() > startDay &&
                      today.getMonth() < endMonth && today.getDay() < endDay) {
                  notify = true;
                }
              } else {
                var registeredDate = new Date(prop.dateAdded);
                if(today.getFullYear() === registeredDate.getFullYear()) {
                  // check if registered month was January
                  if (registeredDate.getMonth() === 0) {
                    notify = true;
                  }
                } else if (today.getFullYear() - registeredDate.getFullYear() > 1) {
                  // Always notify if more than a year!
                  notify = true;
                } else {
                  if(registeredDate.getMonth() - today.getMonth() <= 1) {
                    notify = true;
                  }
                }                
              }
              break;
            case 'monthly':
              notify = true;
              break;
            default:
              $log.info("Unknown recurrence.", reminder);
            }
          }

          if (completedTasks && completedTasks.length) {
            prop.totalTasksCompleted += completedTasks.length;
          }

          // Update the reminders
          if (notify) {
            $scope.checklistReminders = $scope.checklistReminders || {};
            $scope.checklistReminders[prop.id + '-' + masterChecklist.id] = {
              checklistName: masterChecklist.displayName,
              propertyName: prop.name
            };
          }
        });

        prop.totalTasksCompleted = Math.floor((prop.totalTasksCompleted / numTotalTasks) * 100)
      });

      
    });
  };

  if ($rootScope.auth.user) {
    $scope.loadProperties(null, $rootScope.auth.user);
  }

  // Register listeners
  $scope.$on("$firebaseSimpleLogin:login", $scope.loadProperties);
  $scope.$on("userProperties:loaded", $scope.checkForNotifications);
});