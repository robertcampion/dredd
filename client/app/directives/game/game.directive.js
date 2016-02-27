'use strict';

angular.module('dreddApp')
  .directive('game', function () {
  
    var controller = ['$http', '$timeout', 'teamsService', 'appConfig', function($http, $timeout, teamsService, appConfig) {
      
      this.$http = $http;
      this.teamsService = teamsService;
      this.actionPrototypes = appConfig.actionPrototypes;
      
      this.submitAction = function(action) {
        action.team = this.game.teams[0];
        this.$http.post('/api/games/' + this.game._id + '/actions', action);
      }
      
      this.submitPsuedoAction = function(action) {
        this.$http.post('/api/games/' + this.game._id + '/actions/' + action);
      }
      
      this.deleteAction = function(actionId) {
        this.$http.delete('/api/games/' + this.game._id + '/actions/' + actionId);
      }
      
      this.setTeam = function(idx, teamId) {
        var teams = _.clone(this.game.teams);
        teams[idx] = teamId;
        this.$http.put('/api/games/' + this.game._id, { teams: teams });
      }
      
      this.submitEdit = function(edit) {
        this.$http.put('/api/games/' + this.game._id, edit);
      }
      
      this.deleteGame = function() {
        this.$http.delete('/api/games/' + this.game._id);
      },
      
      this.setCurrentGameTime = () => {
        var time = this.game.gameTimeAtEpoch;
        if(this.game.clockRunning) {
          time += Date.now() - new Date(this.game.dateAtEpoch);
        }
        if(time > this.game.duration) {
          time  = this.game.duration;
        }
        this.currentGameTime = time;
        $timeout(this.setCurrentGameTime, 100);
      };
      
      this.setCurrentGameTime();
    }];
  
    return {
      templateUrl: 'app/directives/game/game.html',
      restrict: 'E',
      scope: {
        game: '='
      },
      controller: controller,
      controllerAs: 'gameCtrl',
      bindToController: true
    };
  });
