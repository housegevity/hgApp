
angular.module('hgApp.service.login', ['firebase', 'hgApp.service.firebase'])
  // loginService manages user login / logout and profile services.
  .factory('loginService', ['$timeout', '$firebaseSimpleLogin', 'firebaseRef', 'profileCreator', 'scope',
    function ($timeout, $firebaseSimpleLogin, firebaseRef, profileCreator, scope) {
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
          auth.$login('google', {
            rememberMe: true,
            scope: scope
          }).then(function (user) {
            if (callback) {
              //todo-bug https://github.com/firebase/angularFire/issues/199
              $timeout(function () {
                callback(null, user);
              });
            }
          }, callback);
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