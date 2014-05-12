'use strict';

/* Controllers */
angular.module('hgApp.controller.propertyCtrl', ['firebase'])

.controller('propertyCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$http', '$log', 'propertyManager',
  function ($rootScope, $scope, $location, $routeParams, $http, $log, propertyManager) {
  $log.info("Init scope");

  $scope.property = null;

  $scope.addNewProperty = function(newProperty) {
    var user = $rootScope.auth.user;

    $scope.property = angular.copy(newProperty);

    // TODO Upload photos

    // Save the proeprty to firebase
    propertyManager.save(user, $scope.property, function (respData) {

    });
  };
}]);