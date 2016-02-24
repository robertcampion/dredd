'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/teams',
        templateUrl: 'app/pages/teams/teams.html',
        controller: 'TeamsCtrl',
        controllerAs: 'teamsCtrl'
      });
  });
