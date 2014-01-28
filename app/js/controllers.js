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

.controller('dashCtrl', function($scope, myProperties, buyProperties) {	
	console.log('home controller seperated')

	$scope.myProperties = myProperties;
	$scope.buyProperties = buyProperties;

	$scope.myPropertieslength = myProperties.length;
	$scope.buyPropertieslength = buyProperties.length;

	$scope.addbuyProperty = function() {
		$('#addProperty').modal('show');
		console.log('wtf')
	}

	$scope.selected = 1;

	$scope.data = {
		selectedTab: 1
	};
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})