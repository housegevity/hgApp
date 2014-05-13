/* global angular */
'use strict';

angular.module('hgApp.service.documentManager', ['firebase', 'angular-gapi'])
  .factory('documentManager', ['$log', 'repository',
    function ($log, repository) {
      var collection = 'documents';
      return {
        upload: function (user, file, callback) {
          AWS.config.credentials.get();
          var s3 = new AWS.S3({apiVersion: '2006-03-01'});
          s3.putObject({
            Bucket: 'housegevity-docs', 
            Key: [user.id, file.name].join('/'),
            ContentType: file.type,
            Body: file,
            ACL: 'private',
            ServerSideEncryption: 'AES256'
          }, function (err, data) {
            if (err) {
              $log.error(err);
            } else {
              $log.info(data);
            }
          });
        }
      };
    }
  ]);
