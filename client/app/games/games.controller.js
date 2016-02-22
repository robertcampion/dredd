'use strict';

angular.module('dreddApp')
  .controller('GamesCtrl', function ($scope, $http) {
    
    this.$http = $http;
    
    this.addGame = function() {
      this.$http.post('/api/games', {duration: 5*60*1000});
    }
    
    
  });
