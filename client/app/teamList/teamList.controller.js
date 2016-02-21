'use strict';

angular.module('dreddApp')
  .controller('TeamListCtrl', function ($http, $scope, socket) {
    
    this.$http = $http;
    
    this.teams = [];
    
    this.$http.get('/api/teams').then(response => {
      this.teams = response.data;
      socket.syncUpdates('team', this.teams);
    });
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('team');
    });
    
    this.deleteTeam = function(id) {
      this.$http.delete('/api/teams/' + id)
    }
    
    
    
  });
