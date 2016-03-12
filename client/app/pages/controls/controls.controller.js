'use strict';

angular.module('dreddApp')
  .controller('ControlsCtrl', ['$scope', '$http', '$timeout', '$state', 'socket', 'appConfig', 'teamsService', 'gamesService', '$stateParams', 'timesync', function($scope, $http, $timeout, $state, socket, appConfig, teamsService, gamesService, $stateParams, timesync) {
      
    this.$http = $http;
    this.actionPrototypes = appConfig.actionPrototypes;
    
    this.teamsService = teamsService;
    this.gamesService = gamesService;
    
    this.id = $stateParams.id;
    this.game = {};
    this.team = null;
    this.teamIdx = -1;
    this.teamActionsOnly = true;
    
    if(this.id == 'current') {
      this.game = this.gamesService.currentGame;
      $scope.$watch(() => this.gamesService.currentGame, (game) => {
        //console.log(game);
        this.game = game;
        this.team = this.game.teams ? this.game.teams[this.teamIdx] : null;
      });
    }
    else {
      this.$http.get('/api/games/' + this.id).then(response => {
        this.game = response.data;
        this.setCurrentGameTime();
        
        socket.socket.on('game:save', item => {
          if(item._id == this.id) {
            Object.assign(this.game, item);
          }
        });
        socket.socket.on('game:remove', item => {
          if(item._id == this.id) {
            $state.go('games');
          }
        });
      });
    }
    
    this.submitAction = function(action) {
      action.team = this.team;
      this.$http.post('/api/games/' + this.game._id + '/actions', action);
    }
    
    this.submitPsuedoAction = function(action) {
      this.$http.post('/api/games/' + this.game._id + '/actions/' + action);
    }
    
    this.deleteAction = function(actionId) {
      this.$http.delete('/api/games/' + this.game._id + '/actions/' + actionId);
    }
    
    this.setTeam = function(teamId) {
      this.team = teamId;
      this.teamIdx = this.game.teams.indexOf(teamId);
    }
    
    this.submitEdit = function(edit) {
      this.$http.put('/api/games/' + this.game._id, edit);
    }
    
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
