/* global angular */
'use strict';

angular.module('hgApp.service.login', ['angular-gapi', 'firebase', 'hgApp.service.firebase'])
  // loginService manages user login / logout and profile services.
  .factory('loginService', ['$log', '$timeout', '$firebaseSimpleLogin', 'firebaseRef', 'GAPI', 'profileCreator', 'scope', 'GAPI_CLIENTID',
                    function ($log, $timeout, $firebaseSimpleLogin, firebaseRef, GAPI, profileCreator, scope, GAPI_CLIENTID) {
      var auth = null;
      return {
        init: function () {
          auth = $firebaseSimpleLogin(firebaseRef());
          return auth;
        },

        /**
         * @param {Function} [callback]
         * @returns {*}
         */
        login: function (callback) {
          assertAuth();

          // Login with Google first
          gapi.auth.authorize({
            client_id: GAPI_CLIENTID, 
            scope: scope, 
            response_type: "token id_token",
            include_granted_scopes: false,
            immediate: false
          }, function (authResult) {
            if (authResult && !authResult.error) {
              auth.$login('google', {
                access_token: authResult.access_token,
                scope: scope
              }).then(function (user) {
                if (callback) {
                  //todo-bug https://github.com/firebase/angularFire/issues/199
                  $timeout(function () {
                    callback(null, user);
                  });
                }
              }, callback);
            } else {
              throw new Error("Error logging in with Google.");
            }
          });
        },

        logout: function () {
          assertAuth();
          auth.$logout();
        },

        createProfile: profileCreator
      };

      function assertAuth() {
        if (auth === null) {
          throw new Error('Must call loginService.init() before using its methods');
        }
      }
    }
  ])

  // Profile creator creates a user profile for the authorized user.
  .factory('profileCreator', ['firebaseRef', '$timeout',
    function (firebaseRef, $timeout) {
      return function (id, email, callback) {
        firebaseRef('users/' + id).set({
          email: email
        }, function (err) {
          if (callback) {
            $timeout(function () {
              callback(err);
            });
          }
        });
      };
    }
  ]);