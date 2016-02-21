'use strict';

angular.module('dreddApp')
  .controller('NewTeamCtrl', function ($http, $scope) {
    
    this.$http = $http;
    
    this.reset = function() {
      this.team = {name: '', school: ''};
    }
    
    this.reset();
    
    this.addTeam = function() {
      this.$http.post('/api/teams', this.team);
      
      this.reset();;
    }
    
    
  });
