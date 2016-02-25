'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('oldgames', {
        url: '/oldgames',
        templateUrl: 'app/games/games.html',
        controller: 'oldGamesCtrl',
        controllerAs: 'gamesCtrl'
      });
  });
