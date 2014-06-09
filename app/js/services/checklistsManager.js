/* global angular */
'use strict';

angular.module('hgApp.services')
  .service('checklistsManager', ['$log', 'repository',
    function ($log, repository) {
      return {
        getAllChecklists: function () {
          return repository.list(null, 'checklists');
        }
      };
    }]);