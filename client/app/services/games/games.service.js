'use strict';

angular.module('dreddApp')
  .service('gamesService', ['$http', 'socket', function($http, socket) {
    
    this.$http = $http;
    
    this.games = [];
    
    this.currentGame = {};
    this.setCurrent = () => {
      var sorted = this.games.filter(this.queued)
        .sort((g1, g2) => g1.queuePosition - g2.queuePosition);
        
      if(sorted.length > 0) {
        this.currentGame = sorted[0];
      }
      else {
        this.currentGame = {};
      }
    }
    
    
    this.$http.get('/api/games').then(response => {
      this.games.push(...response.data);
      this.setCurrent();
      socket.syncUpdates('game', this.games, this.setCurrent);
    });
    
    this.getGameById = function(gameId) {
      for(var game of this.games) {
        if(game._id === gameId) {
          return game;
        }
      }
      return null;  
    }
    
    // filters
    
    this.queued    = game => game.queued;
    this.unqueued  = game => !game.queued && !game.dateCompleted;
    this.completed = game => game.dateCompleted;
    
  }]);
