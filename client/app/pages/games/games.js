'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('games', {
        url: '/games',
        templateUrl: 'app/pages/games/games.html',
        controller: 'GamesCtrl',
        controllerAs: 'gamesCtrl'
      });
  });
