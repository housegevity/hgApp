/* global angular */
'use strict';

angular.module('hgApp.service.propertyManager', ['firebase', 'angular-gapi', 'ng-shortId'])
  .factory('propertyManager', ['$log', 'repository', 'shortId',
    function ($log, repository, shortId) {
      var collection = 'properties';
      return {
        /**
         * Retrieve all properties for the logged in user.
         *
         * @param {limit} [limit] Max results to return
         * @return A (possibly empty) list with all the user's properties.
         */
        list: function (user, limit) {
          return repository.list(user, collection, limit);
        },

        /**
         * Save a property for the logged in user.
         *
         * @param {Object} propertyObj A property object with required fields set. No data validation yet.
         * @param {function} [callback] Optional callback function after object is saved.
         * @return The Firebase reference object.
         */
        save: function (user, propertyObj, callback) {
          if (!propertyObj.id) {
            propertyObj.id = shortId.generate();
          }

          $log.info("Saving property", propertyObj);

          return repository.save(user, collection, propertyObj, callback);
        }
      };
    }
  ]);