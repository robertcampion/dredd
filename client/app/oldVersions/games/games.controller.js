'use strict';

angular.module('dreddApp')
  .controller('oldGamesCtrl', function ($scope, $http, appConfig) {
    
    this.$http = $http;
    
    this.addGame = function() {
      this.$http.post('/api/games', {});
    }
    
    this.actionPrototypes = appConfig.actionPrototypes;
    
    console.log(this.actionPrototypes);
    
  });
