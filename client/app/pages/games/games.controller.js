'use strict';

angular.module('dreddApp')
  .controller('GamesCtrl', ['$http', 'gamesService', function($http, gamesService, teamsService) {
    this.$http = $http;
    
    this.gamesService = gamesService;
    
    this.addGame = function(game) {
      this.$http.post('/api/games/', game);
    }
    
    this.submitEdit = function(game, edit) {
      this.$http.put('/api/games/' + game._id, edit);
    }
    
    this.queueGame = function(game) {
      var lastPosition = Math.max(...
        this.gamesService.games
          .filter(this.gamesService.queued)
          .map(g => g.queuePosition)
      );
      if(lastPosition < 0) {
        lastPosition = 0;
      }
      this.submitEdit(game, {queuePosition: lastPosition + 1});
    }
    
    this.moveGameInQueue = function(game, i) {
      if(!game.queued) {
        return;
      }
      var newPosition = game.queuePosition + i;
      if(newPosition < 1) {
        return;
      }
      this.gamesService.games
        .filter(g => g.queuePosition == newPosition)
        .map(g => this.submitEdit(g, {queuePosition: game.queuePosition}));
      
      this.submitEdit(game, {queuePosition: newPosition});
    }
    
  }]);
