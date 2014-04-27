/**
 * Google API 
 * 
 * This module allows client-side access to the various Google APIs. A valid API key is required to use.
 */
angular.module('google', [])
  .provider('googleApi', function GoogleAPIProvider() {
    this.configure = function (apiKey) {
      this._apiKey = apiKey;
    };

    this.$get = function () {
      var apiKey = this._apiKey;

      if (!apiKey) {
        throw new Error("Google API not configured.");
      }

      return {
        handleClientLoad: function () {
          gapi.client.setApiKey(apiKey);
        }
      };
    };
  });