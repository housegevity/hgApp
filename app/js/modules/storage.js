angular.module('s3.storage', ['angularFileUpload'])
  .factory('storage', ['$upload', '$log', '$q',
    function ($upload, $log, $q) {
      return {
        upload: function (user, file, metadata) {
          $log.info("Uploading file.");
        }
      }
    }
  ]);