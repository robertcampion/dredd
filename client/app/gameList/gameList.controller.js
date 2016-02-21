'use strict';

angular.module('dreddApp')
  .controller('GameListCtrl', function ($http, $scope, socket) {
    
    this.$http = $http;
    
    this.games = [];
    this.teams = [];
    
    this.$http.get('/api/games').then(response => {
      this.games = response.data;
      socket.syncUpdates('game', this.games);
    });
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('game');
    });
    
    this.deleteGame = function(id) {
      this.$http.delete('/api/games/' + id)
    }
    
    
  });
