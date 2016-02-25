'use strict';

angular.module('dreddApp')
  .controller('GamesCtrl', ['$http', 'gamesService', function($http, gamesService, teamsService) {
    this.$http = $http;
    
    this.gamesService = gamesService;
    
    this.addGame = function(game) {
      this.$http.post('/api/games/', game);
    }
    
  }]);
