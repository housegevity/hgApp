'use strict';

angular.module('hgApp.controller.loginCtrl', [])

.controller('loginCtrl', function ($scope, $log, loginService) {
  /* Login - Authenticate the user with Google Auth */
  $scope.login = function () {
    $scope.err = null;
    loginService.login(function (err, user) {
      $scope.err = err ? err + '' : null;
      if (!err) {
        loginService.createProfile(user.id, user.email);

        // TODO Pull out somewhere else and create an S3 bucket for the user
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