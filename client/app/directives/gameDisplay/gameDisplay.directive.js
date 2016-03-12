'use strict';

angular.module('dreddApp')
  .directive('gameDisplay', function () {
  
    var controller = ['teamsService', function(teamsService) {
      
      this.teamsService = teamsService;
      
      
    }];
  
    return {
      templateUrl: 'app/directives/gameDisplay/gameDisplay.html',
      restrict: 'E',
      scope: {
        game: '=',
        scores: '@'
      },
      controller: controller,
      controllerAs: 'gameCtrl',
      bindToController: true
    };
  });
