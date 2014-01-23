'use strict';

/* Controllers */

console.log('controllers loaded')

angular.module('myApp.controllers', [])

.controller('homeCtrl', function($scope, $location) {
	$scope.newUser = true

	$scope.signUp = function() {
		$location.path('dash')
		console.log('send me to the')
	}

	$scope.signIn = function() {
		$scope.newUser = !$scope.newUser
		console.log('WHAT THE FUCK')
	}
})

.controller('dashCtrl', function($scope) {	
	console.log('home controller seperated')

	$scope.addbuyProperty = function() {
		$('#addProperty').modal('show')
		console.log('show the addbuy modal')
	}

	$scope.myProperties = [
		{
			'name': 'Tiburon Mansion',
			'city': 'Tiburon',
			'state': 'CA',
			'date_added': '1/2/12'
		},
		{
			'name': 'Thugz Mansion',
			'city': 'Tiburon',
			'state': 'CA',
			'date_added': '3/23/12'
		},
		{
			'name': 'Ski House',
			'city': 'Tahoe',
			'state': 'CA',
			'date_added': '2/29/13'
		}
	];

	$scope.buyProperties = [
		{
			'name': '3 Bedroom Fixer Upper',
			'city': 'Santa Rosa',
			'state': 'CA',
			'date_added': '2/3/14'
		},
		{
			'name': '2 Bedroom Condo',
			'city': 'Vallejo',
			'state': 'CA',
			'date_added': '4/10/20'
		},
		{
			'name': 'Apartment',
			'city': 'Salt Lake City',
			'state': 'UT',
			'date_added': '2/5/14'
		}
	];
})

.controller('settingCtrl', function($scope, $location) {
	console.log('settings controller seperated')
})