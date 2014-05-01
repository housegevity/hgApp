/* global angular*/
angular.module('hgApp.service.resources', ['firebase'])
  .factory('propertyManager', ['repository', 'gapi',
    function (repository, gapi) {
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
  .factory('documentManager', ['$log', 'repository',
    function ($log, repository) {
      var collection = 'documents';
      return {
        upload: function (user, file, callback) {
          AWS.config.credentials.get();
          var s3 = new AWS.S3({apiVersion: '2006-03-01'});
          s3.putObject({
            Bucket: 'housegevity-docs', 
            Key: file.name,
            ContentType: file.type,
            Body: file,
            ACL: 'private'
          }, function (err, data) {
            $log.info(err);
            $log.info(data);
          });
        }
      };
    }
  ]);
