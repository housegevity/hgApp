'use strict';

angular.module('hgApp.docCtrl', ['hgApp.service.resources'])

.controller('docCtrl', ['$scope', '$log', 'documentManager', function ($scope, $log, documentManager) {
  var user = $scope.auth.user;

  $scope.onFileSelect = function ($files) {
    var file = $files[0];
    file.progress = parseInt(0);
    $log.info(file);
    documentManager.upload(user, file);
  }
}]);