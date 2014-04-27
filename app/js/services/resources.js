/* global angular*/
angular.module('hgApp.service.resources', ['firebase', 'hgApp.service.firebase'])
  .factory('propertyManager', ['repository',
    function (repository) {
      var collection = 'properties';
      return {
        /**
         * Retrieve all properties for the logged in user.
         *
         * @param {limit} [limit] Max results to return
         * @return A (possibly empty) list with all the user's properties.
         */
        list: function (limit) {
          return repository.list(collection, limit);
        },
        
        /**
         * Save a property for the logged in user.
         *
         * @param {Object} propertyObj A property object with required fields set. No data validation yet.
         * @param {function} [callback] Optional callback function after object is saved.
         * @return The Firebase reference object.
         */
        save: function (propertyObj, callback) {
          return repository.save(collection, propertyObj, callback);
        }
      };
    }
  ])
  .factory('documentManager', ['repository', 'storage',
    function (repository, storage) {
      var collection = 'documents';
      return {
        /**
         * Upload a document to cloud storage.
         *
         */
        upload: function (documentObj, callback) {

        }
      };
    }
  ]);
