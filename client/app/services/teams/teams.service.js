'use strict';

angular.module('dreddApp')
  .service('teamsService', ['$http', 'socket', function ($http, socket) {
    
    this.$http = $http;
    
    this.teams = [];
    
    this.$http.get('/api/teams').then(response => {
      this.teams.push(...response.data);
      socket.syncUpdates('team', this.teams);
    });
    
    this.getTeamById = function(teamId) {
      for(var team of this.teams) {
        if(team._id === teamId) {
          return team;
        }
      }
      return null;  
    }
    
    /*$rootScope.$on('$destroy', function() {
      socket.unsyncUpdates('team');
    });*/
  }]);
