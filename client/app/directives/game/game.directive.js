'use strict';

angular.module('dreddApp')
  .directive('game', function () {
  
    var controller = ['$http', '$timeout', 'teamsService', 'appConfig', function($http, $timeout, teamsService, appConfig) {
      
      this.$http = $http;
      this.teamsService = teamsService;
      this.actionPrototypes = appConfig.actionPrototypes;
      
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
      }
      
      this.getTeamById = function(teamId) {
        for(var team of this.teamsService.teams) {
          if(team._id === teamId) {
            return team;
          }
        }
        return null;
      }
      
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
