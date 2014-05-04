'use strict';

angular.module('hgApp.loginCtrl', [])

.controller('loginCtrl', function ($scope, $log, loginService) {
  $scope.login = function () {
    $scope.err = null;
    loginService.login(function (err, user) {
      $scope.err = err ? err + '' : null;
      if (!err) {
        loginService.createProfile(user.uid, user.email);

        AWS.config.credentials = new AWS.WebIdentityCredentials({
          RoleArn: 'arn:aws:iam::281759738925:role/google-auth',
          ProviderId: null,
          WebIdentityToken: gapi.auth.getToken().id_token
        });
      } else {
        $log.error(err);
      }


    });
  };
});