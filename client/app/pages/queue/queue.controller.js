'use strict';

angular.module('dreddApp')
  .controller('QueueCtrl', ['$http', 'gamesService', function($http, gamesService, teamsService) {
    this.$http = $http;
    
    this.gamesService = gamesService;
    
  }]);
