'use strict';

angular.module('dreddApp')
  .controller('GameListCtrl', function ($http, $scope, socket) {
    
    this.$http = $http;
    
    this.games = [];
    this.teams = [];
    
    this.getTeamById = function(teamId) {
      for(var team of this.teams) {
        if(team._id === teamId) {
          return team;
        }
      }
      return null;  
    }
    
    this.$http.get('/api/games').then(response => {
      this.games = response.data;
      socket.syncUpdates('game', this.games);
    });
    
    this.$http.get('/api/teams').then(response => {
      this.teams = response.data;
      socket.syncUpdates('team', this.teams);
    });
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('game');
      socket.unsyncUpdates('team');
    });
    
    this.deleteGame = function(id) {
      this.$http.delete('/api/games/' + id)
    }
    
  });
