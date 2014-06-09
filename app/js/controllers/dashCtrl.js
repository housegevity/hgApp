'use strict';

angular.module('hgApp.controller.dashCtrl', [])

.controller('dashCtrl', function ($log, $rootScope, $scope, $http, $location, $stateParams, propertyManager) {
  $scope.listProperties = function (event, user) {
    propertyManager.list(user).$on('loaded', function (data) {
      $scope.numProperties = 0;
      $scope.allProperties = data;

      angular.forEach(data, function (v, k) {
        $scope.numProperties++;
      });
    })
  };

  if ($rootScope.auth.user) {
    $scope.listProperties(null, $rootScope.auth.user);
  } else {
    // Initialize the scope, only if the user has logged in.
    $scope.$on("$firebaseSimpleLogin:login", $scope.listProperties);
  }
});