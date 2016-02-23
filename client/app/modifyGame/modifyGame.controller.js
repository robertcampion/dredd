'use strict';

angular.module('dreddApp')
  .controller('ModifyGameCtrl', function ($http, $scope) {
    
    this.$http = $http;
    
    this.sendToServer = function() {
      var result = this.$http.put('/api/games/' + this.game._id, this.game);
    }
    
    this.setTeam = function(idx, teamId) {
      this.game.teams[idx] = teamId;
      this.sendToServer();
    }

  });
