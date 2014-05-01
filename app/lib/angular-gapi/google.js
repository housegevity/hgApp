/**
 * Google API
 *
 * This module allows client-side access to the various Google APIs. A valid API key is required to use.
 */
angular.module('angular-gapi', [])
  .provider('GAPI', function () {
    var _initFunction = null;

    return {
      setInitFunction: function (func) {
        if (angular.isArray(func) || angular.isFunction(func)) {
          _initFunction = func;
        } else {
          throw new Error("Invalid init function.");
        }
      },
      getInitFunction: function () {
        return _initFunction;
      },

      // $get function required by provider spec
      $get: ['$window', '$document', '$q', '$injector',
        function ($window, $document, $q, $injector) {
          var _GAPI;

          // Load the SDK's source Asynchronously
          (function(d){
            var js, id = 'gapi-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//apis.google.com/js/client.js?onload=gapiAsyncInit";
            ref.parentNode.insertBefore(js, ref);
          }($document[0]));

          $window.gapiAsyncInit = function () {
            $injector.invoke(_initFunction, null);
            _GAPI.$$ready = true;
            // angular.extend(_GAPI, gapi);
          };

          _GAPI = {
            $$ready: false
          };

          return _GAPI;
        }
      ]
    };
  });