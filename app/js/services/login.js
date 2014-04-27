
angular.module('hgApp.service.login', ['firebase', 'hgApp.service.firebase'])
  
  .factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', '$timeout',
    function ($rootScope, $firebaseSimpleLogin, firebaseRef, $timeout) {
      var auth = null;
      return {
        init: function () {
          return auth = $firebaseSimpleLogin(firebaseRef());
        },

        /**
         * @param {string} email
         * @param {string} pass
         * @param {Function} [callback]
         * @returns {*}
         */
        login: function (email, pass, callback) {
          assertAuth();
          auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
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
        }
      };

      function assertAuth() {
        if (auth === null) {
          throw new Error('Must call loginService.init() before using its methods');
        }
      }
    }
  ]);