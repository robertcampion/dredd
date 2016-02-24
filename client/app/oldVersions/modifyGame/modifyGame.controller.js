'use strict';

angular.module('dreddApp')
  .controller('ModifyGameCtrl', function ($http, $scope) {
    
    this.$http = $http;
    
    this.submitAction = function(action) {
      action.team = this.game.teams[0];
      this.$http.post('/api/games/' + this.game._id + '/actions', action);
    }
    
    this.deleteAction = function(actionId) {
      this.$http.delete('/api/games/' + this.game._id + '/actions/' + actionId);
    }
    
    this.setTeam = function(idx, teamId) {
      var teams = _.clone(this.game.teams);
      teams[idx] = teamId;
      this.$http.put('/api/games/' + this.game._id, { teams: teams });
    }

  });
