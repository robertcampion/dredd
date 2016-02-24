'use strict';

angular.module('dreddApp')
  .controller('TeamsCtrl', ['teamsService', function (teamsService) {
    //$scope.message = 'Hello';
    
    this.teams = teamsService;
    
  }]);
