'use strict';

/* Controllers */
angular.module('hgApp.addPropertyCtrl', ['firebase'])

.controller('addPropertyCtrl', function($http, $location, $routeParams, $scope, $state) {
	$scope.user = {};
	$scope.addProperty = function () {};
	$scope.addPropertyStatus = true;
});