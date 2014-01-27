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
			'name': 'SICK HOUSE',
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
});
