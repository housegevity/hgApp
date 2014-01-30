'use strict';

angular.module('myApp.services', [])

.factory('myProperties', function() {

	var myProperties = [
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
			'name': 'Sophias Apartment',
			'city': 'Salt Lake City',
			'state': 'UT',
			'date_added': '2/5/14'
		},		
		{
			'name': 'Ski Condo',
			'city': 'Salt Lake City',
			'state': 'UT',
			'date_added': '2/5/14'
		},
	]

	//return the array here
	return myProperties
})

.factory('buyProperties', function() {

	var buyProperties = [
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
			'name': '2 Bedroom Condo',
			'city': 'Vallejo',
			'state': 'CA',
			'date_added': '4/10/20'
		},
	];

	//return the array here
	return buyProperties
})

.factory('buyReqs', function() {

	var buyReqs = [
		{'name': 'Most recent paystubs'},
		{'name': '2011 and 2012 W-2’s and/or 1099’s'},
		{'name': '2011 and 2012 Tax Returns (1040’s)'},
		{'name': '2011 and 2012 K-1’s'},
		{'name': 'Checking, savings, and retirement statements'},
		{'name': 'California Driver’s License'},
	];

	//return the array here
	return buyReqs
})

.factory('ownReqs', function() {

	var ownReqs = [
		{'name': 'HVAC Docs'},
		{'name': 'Painting'},
		{'name': 'Plumbing Checks'},
		{'name': 'Electrical Code'},
		{'name': 'Landscaping Maint'},
	];

	//return the array here
	return ownReqs
})

