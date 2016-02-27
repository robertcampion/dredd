'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('controls', {
        url: '/games/:id',
        templateUrl: 'app/pages/controls/controls.html',
        controller: 'ControlsCtrl',
        controllerAs: 'gameCtrl'
      });
  });
