'use strict';

angular.module('dreddApp')
  .controller('ModifyGameCtrl', function ($http, $scope) {
    
    this.$http = $http;
    
    this.sendToServer = function() {
      var result = this.$http.put('/api/games/' + this.game._id, this.game);
    }
    
    this.removeTeam = function(teamId) {
      var index = this.game.teams.indexOf(teamId);
      if(index >= 0) {
        this.game.teams.splice(index, 1);
      }
      this.sendToServer();
    }
    
    this.addTeam = function(teamId) {
      this.game.teams.push(teamId);
      this.sendToServer();
    }

  });
