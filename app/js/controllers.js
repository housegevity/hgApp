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

.controller('dashCtrl', function($scope, $location, $routeParams, myProperties, buyReqs, ownReqs) {	

	//GRAB THE DATA DEPENDENCY INJECTIONS
	$scope.myProperties = myProperties;
	$scope.ownReqs = ownReqs;

	//WATCH THE ROUTE, player
	$scope.currentRoute = $location.url();
	$scope.propertyID = $routeParams.propertyID;

	//DATA MANIPULATIONS
	$scope.myPropertieslength = myProperties.length;

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

.controller('propertyCtrl', function($scope, $location, $routeParams, $http, myProperties, ownReqs, documents) {

	$scope.selectedTab = 1;

	//GRAB THE DATA DEPENDENCY INJECTIONS
	$scope.myProperties = myProperties;
	$scope.ownReqs = ownReqs;

	//GRAB THE NESCESSARY JSON DATA

	$http.get('data/properties/' + $routeParams.propertyID + '.json').success(function(data) {
		$scope.properties = data;
	});

	$http.get('data/all_required_docs.json').success(function(data) {
		$scope.required_docs = data;
	});

	$http.get('data/presummer_notifications.json').success(function(data) {
		$scope.presummer_notifications = data;
		$scope.presummer_notificationsLength = $scope.presummer_notifications.length;
	});

	$http.get('data/prewinter_notifications.json').success(function(data) {
		$scope.prewinter_notifications = data;
		$scope.prewinter_notificationsLength = $scope.prewinter_notifications.length;
	});

	$http.get('data/quarterly_notifications.json').success(function(data) {
		$scope.quarterly_notifications = data;
		$scope.quarterly_notificationsLength = $scope.quarterly_notifications.length;
	});

	$http.get('data/annual_notifications.json').success(function(data) {
		$scope.annual_notifications = data;
		$scope.annual_notificationsLength = $scope.annual_notifications.length;
	});

	//UI CONTROLS

	$scope.selectedTab = 1;
	$scope.selectedDocID = null;	
	
	$scope.setSelected = function (selectedDocID) {
		$scope.selectedDocID = selectedDocID;
		console.log("document category selected")
	};

	$scope.addDocument = function() {
		$('#documentModal').modal('show');
	}

})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})