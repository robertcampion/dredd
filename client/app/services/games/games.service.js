'use strict';

angular.module('dreddApp')
  .service('gamesService', ['$http', 'socket', function($http, socket) {
    
    this.$http = $http;
    
    this.games = [];
    
    this.$http.get('/api/games').then(response => {
      this.games.push(...response.data);
      socket.syncUpdates('game', this.games);
    });
    
    this.getGameById = function(gameId) {
      for(var game of this.games) {
        if(game._id === gameId) {
          return game;
        }
      }
      return null;  
    }
  }]);
