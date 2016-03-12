'use strict';

angular.module('dreddApp')
  .controller('ScoreboardCtrl', ['$scope', '$http', '$timeout', '$state', 'socket', 'appConfig', 'teamsService', 'gamesService', 'timesync', function($scope, $http, $timeout, $state, socket, appConfig, teamsService, gamesService, timesync) {
      
    this.$http = $http;
    this.actionPrototypes = appConfig.actionPrototypes;
    
    this.teamsService = teamsService;
    this.gamesService = gamesService;
    
    this.game = this.gamesService.currentGame;
    $scope.$watch(() => this.gamesService.currentGame, (game) => {
      //console.log(game);
      this.game = game;
      this.team = this.game.teams ? this.game.teams[this.teamIdx] : null;
    });
    
    this.setCurrentGameTime = () => {
      if(this.game) {
        var time = this.game.gameTimeAtEpoch;
        if(this.game.clockRunning) {
          time += timesync.now() - new Date(this.game.dateAtEpoch);
        }
        if(time > this.game.duration) {
          time  = this.game.duration;
        }
        this.currentGameTime = time;
       
      }
      else {
        this.currentGameTime = 0;
      }
      $timeout(this.setCurrentGameTime, 100);
    };
    
    $timeout(this.setCurrentGameTime, 100);
  
  }]);
