'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('homeCtrl', function($scope, $location) {
	$scope.newUser = true

	$scope.signUp = function() {
		$location.path('dash')
	}

	$scope.signIn = function() {
		$scope.newUser = !$scope.newUser
	}
})

.controller('dashCtrl', function($scope, myProperties, buyProperties, buyReqs, ownReqs) {	

	$scope.myProperties = myProperties;
	$scope.buyProperties = buyProperties;
	$scope.buyReqs = buyReqs;
	$scope.ownReqs = ownReqs;

	$scope.myPropertieslength = myProperties.length;
	$scope.buyPropertieslength = buyProperties.length;

	$scope.expanded = false;

	$scope.addbuyProperty = function() {
		$('#buyCheck').modal('show');
	}

	$scope.addmyProperty = function() {
		$('#addProperty').modal('show');
	}

	$scope.buyChecklist = function() {
		console.log('buy check list')
		$scope.expanded = true;	
	}

	$scope.selected = 1;

	$scope.data = {
		selectedTab: 1
	};
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})