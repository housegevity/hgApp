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

.controller('dashCtrl', function($scope, $location, myProperties, buyProperties, buyReqs, ownReqs) {	

	//WATCH THE ROUTE, player
	$scope.currentRoute = $location.url();

	//DATA DEPENDENCY INJECTIONS
	$scope.myProperties = myProperties;
	$scope.buyProperties = buyProperties;
	$scope.buyReqs = buyReqs;
	$scope.ownReqs = ownReqs;

	//DATA MANIPULATIONS
	$scope.myPropertieslength = myProperties.length;
	$scope.buyPropertieslength = buyProperties.length;

	$scope.addbuyProperty = function() {
		$('#buyCheck').modal('show');
	}

	$scope.addmyProperty = function() {
		$('#addProperty').modal('show');
	}

	$scope.buyChecklist = function(property) {
		$scope.switchit = 2;
		console.log('param selected')
	};

	$scope.selected = 1;

	$scope.data = {
		selectedTab: 1
	};
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})