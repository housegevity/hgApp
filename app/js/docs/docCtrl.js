'use strict';

angular.module('hgApp.docCtrl', ['hgApp.service.resources'])

.controller('docCtrl', ['$scope', '$log', 'documentManager', function ($scope, $log, documentManager) {
  var user = $scope.auth.user;
  $scope.uploadFile = null;

  $scope.onFileSelect = function ($files) {
    $scope.uploadFile = $files[0];
  }

  $scope.uploadDocument = function () {
    if ($scope.uploadFile) {
      documentManager.upload(user, $scope.uploadFile);
      $scope.uploadFile = null;
    }
  }
}]);