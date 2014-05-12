/* global angular */
'use strict';

angular.module('hgApp.service.testData', [])
  .factory('documents', function () {

    var documents = [{
        'category': 'Essential Documents',
        'doc_name': [
          'A',
          'B',
          'C'
        ],
      },

      {
        'category': 'Renovation Documents',
        'doc_name': [
          'A',
          'B',
          'C'
        ],
      },

      {
        'category': 'Rental Property Documents',
        'doc_name': [
          "one",
          "two",
          "three"
        ]
      },
    ];
    //return the array here
    return documents
  })

  .factory('buyReqs', function () {

    var buyReqs = [{
      'name': 'Most recent paystubs'
    }, {
      'name': '2011 and 2012 W-2’s and/or 1099’s'
    }, {
      'name': '2011 and 2012 Tax Returns (1040’s)'
    }, {
      'name': '2011 and 2012 K-1’s'
    }, {
      'name': 'Checking, savings, and retirement statements'
    }, {
      'name': 'California Driver’s License'
    }, ];

    //return the array here
    return buyReqs
  })

  .factory('ownReqs', function () {

    var ownReqs = [{
      'name': 'HVAC Docs'
    }, {
      'name': 'Painting'
    }, {
      'name': 'Plumbing Checks'
    }, {
      'name': 'Electrical Code'
    }, {
      'name': 'Landscaping Maint'
    }, ];

    //return the array here
    return ownReqs
  });
