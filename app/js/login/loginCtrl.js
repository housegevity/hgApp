'use strict';

angular.module('hgApp.loginCtrl', [])

.controller('loginCtrl', function ($scope, $log, loginService) {
  $scope.login = function () {
    $scope.err = null;
    loginService.login(function (err, user) {
      $scope.err = err ? err + '' : null;
      if (!err) {
        loginService.createProfile(user.uid, user.email);
      } else {
        $log.error(err);
      }
    });
  };
});