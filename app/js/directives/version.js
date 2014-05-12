'use strict';

/* Directives */

angular.module('hgApp.directives.version', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
