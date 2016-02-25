'use strict';

angular.module('dreddApp')
  .controller('TeamsCtrl', ['$http', 'teamsService', function($http, teamsService) {
    this.$http = $http;
    
    this.teamsService = teamsService;
    
    this.addTeam = function(team) {
      this.$http.post('/api/teams/', team);
    }
    
  }]);
