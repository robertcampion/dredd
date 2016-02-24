'use strict';

angular.module('dreddApp')
  .factory('teamsService', ['$http', 'socket', function ($http, socket) {
    
    this.$http = $http;
    
    this.teams = [];
    
    this.$http.get('/api/teams').then(response => {
      this.teams.push(...response.data);
      socket.syncUpdates('team', this.teams);
    });
    
    /*$rootScope.$on('$destroy', function() {
      socket.unsyncUpdates('team');
    });*/
    
    // Public API here
    return this.teams;
  }]);
