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

.controller('dashCtrl', function() {	
	console.log('home controller seperated')
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})