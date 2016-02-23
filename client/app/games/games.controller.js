'use strict';

angular.module('dreddApp')
  .controller('GamesCtrl', function ($scope, $http, appConfig) {
    
    this.$http = $http;
    
    this.addGame = function() {
      this.$http.post('/api/games', {duration: 5*60*1000});
    }
    
    this.actionPrototypes = appConfig.actionPrototypes;
    
    console.log(appConfig);
    
  });
