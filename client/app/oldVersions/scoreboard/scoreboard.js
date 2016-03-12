'use strict';

angular.module('dreddApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scoreboardOld', {
        url: '/scoreboardOld',
        templateUrl: 'app/scoreboard/scoreboard.html',
        controller: 'ScoreboardCtrlOld',
        controllerAs: 'scoreboard'
      });
  });
