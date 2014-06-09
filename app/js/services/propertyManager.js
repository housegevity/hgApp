/* global angular */
'use strict';

angular.module('hgApp.service.propertyManager', ['firebase', 'angular-gapi', 'ng-shortId'])
  .service('propertyManager', ['$log', 'repository', 'shortId',
    function ($log, repository, shortId) {
      var collection = 'properties';
      return {
        upload: function (user, propertyID, file, callback) {
          AWS.config.credentials.get();
          var s3 = new AWS.S3({
            apiVersion: '2006-03-01'
          });
          s3.putObject({
            Bucket: 'housegevity',
            Key: [user.id, propertyID, 'assets', 'images', file.name].join('/'),
            ContentType: file.type,
            Body: file,
            ACL: 'private',
            ServerSideEncryption: 'AES256'
          }, function (err, data) {
            if (callback) {
              callback(err, data);
            }
            $log.info(data);
          });
        },

        /**
         * Retrieve all properties for the logged in user.
         *
         * @param {limit} [limit] Max results to return
         * @return A (possibly empty) list with all the user's properties.
         */
        list: function (user, limit) {
          return user ? repository.list(user, collection, limit) : null;
        },

        get: function (user, propertyID) {
          return user ? repository.find(user, collection, propertyID) : null;
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
          return repository.save(user, collection, propertyObj, callback);
        }
      };
    }
  ]);