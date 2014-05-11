/* global angular */
'use strict';

angular.module('hgApp.service.firebase', ['firebase'])

  // a simple utility to create references to Firebase paths
  .factory('firebaseRef', ['Firebase', 'FBURL',
    function (Firebase, FBURL) {
      /**
       * @function
       * @name firebaseRef
       * @param {String|Array...} path
       * @return a Firebase instance
       */
      return function (path) {
        return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
      };
    }
  ])

  // a simple utility to create $firebase objects from angularFire
  .service('syncData', ['$firebase', 'firebaseRef',
    function ($firebase, firebaseRef) {
      /**
       * @function
       * @name syncData
       * @param {String|Array...} path
       * @param {int} [limit]
       * @return a Firebase instance
       */
      return function (path, limit) {
        var ref = firebaseRef(path);
        limit && (ref = ref.limit(limit));
        return $firebase(ref);
      };
    }
  ])

  .service('repository', ['firebaseRef', 'syncData',
    function (firebaseRef, syncData) {
      return {
        /**
         * Retrieve a list of specified resources for the logged in user.
         *
         * @param {string} userId The logged in user's id.         
         * @param {string} collection The name of the resource collection
         * @param {int} [limit] Optional. The maximum properties to return.
         * @returns A list of resource objects
         */
        list: function (user, collection, limit) {
          return syncData(['users', user.uid, collection], limit);
        },

        /**
         * Save a new resource for the logged in user.
         *
         * @param {string} userId The logged in user's id
         * @param {string} collection The name of the resource collection
         * @param {Object} resourceObj The new resource object
         * @param {Function} [callback] Optional callback after completion.
         * @returns {string} the unique id of the new resource
         */
        save: function (user, collection, resourceObj, callback) {
          return firebaseRef(['users', user.uid, collection]).push(resourceObj, callback);
        }
      };
    }]);

function pathRef(args) {
  for (var i = 0; i < args.length; i++) {
    if (typeof (args[i]) === 'object') {
      args[i] = pathRef(args[i]);
    }
  }
  return args.join('/');
}