'use strict';

/* Controllers */

console.log('controllers loaded')

angular.module('myApp.controllers', []).
	controller('homeCtrl', function($scope, $location) {
	$scope.logIn = function() {
		$location.path('dash')
		console.log('send me to the')
	}
})

.controller('dashCtrl', function($scope) {	
	console.log('home controller seperated')

	$scope.addbuyProperty = function() {
		$('#addProperty').modal('show')
		console.log('show the addbuy modal')
	}
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})