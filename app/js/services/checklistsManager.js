/* global angular */
'use strict';

angular.module('hgApp.services')
  .service('checklistsManager', ['$log', 'repository',
    function ($log, repository) {
      return {
        getAllChecklists: function () {
          return repository.list(null, 'checklists');
        },
        findChecklist: function (name) {
          return repository.find(null, 'checklists', name);
        },
        checklistsFlow: function () {
          return repository.list(null, 'checklistsFlow');
        }
      };
    }
  ]);