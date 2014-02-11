'use strict';

angular.module('myApp.services', [])

.factory('myProperties', function() {

	var myProperties = [
		{
			'name': '3 Bedroom Fixer Upper',
			'city': 'Santa Rosa',
			'state': 'CA',
			'date_added': '2/3/14',
			'completion_status': '80%',
		},
		{
			'name': '2 Bedroom Condo',
			'city': 'Vallejo',
			'state': 'CA',
			'date_added': '4/10/20',
			'completion_status': '50%',
		},
		{
			'name': 'Sophias Apartment',
			'city': 'Salt Lake City',
			'state': 'UT',
			'date_added': '2/5/14',
			'completion_status': '40%',
		},		
		{
			'name': 'Ski Condo',
			'city': 'Salt Lake City',
			'state': 'UT',
			'date_added': '2/5/14',
			'completion_status': '50%',
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
			'date_added': '2/3/14',
			'completion_status': '100%',
			'id': 1,
			'switchit': 1,
		},
		{
			'name': '2 Bedroom Condo',
			'city': 'Vallejo',
			'state': 'CA',
			'date_added': '4/10/20',
			'completion_status': '80%',
			'id': 2,
			'switchit': 1,
		},
		{
			'name': '2 Bedroom Condo',
			'city': 'Vallejo',
			'state': 'CA',
			'date_added': '4/10/20',
			'completion_status': '20%',
			'id': 3,
			'switchit': 1,
		},
		{
			'name': '1 Bedroom Apartment',
			'city': 'Richmond',
			'state': 'CA',
			'date_added': '3/25/20',
			'completion_status': '10%',
			'id': 4,
			'switchit': 1,
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
