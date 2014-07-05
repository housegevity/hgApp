/* global angular */
'use strict';

angular.module('hgApp.services')
  .service('checklistsManager', ['$q', '$log', 'repository',
    function ($q, $log, repository) {
      var loadRef = function (ref) {
        var d = $q.defer();

        ref.$on('loaded', function (data) {
          d.notify("Resolving Firebase reference");
          d.resolve(data);
        });
        return d.promise;
      };

      return {
        getAllChecklists: function () {
          return loadRef(repository.list(null, 'checklists'));
        },
        findChecklist: function (name) {
          return loadRef(repository.find(null, 'checklists', name));
        },
        checklistsFlow: function () {
          return loadRef(repository.list(null, 'checklistsFlow'));
        }
      };
    }
  ]);