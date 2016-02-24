'use strict';

angular.module('dreddApp')
  .directive('editTeam', [function() {
  
    var controller = [function() {
      
      this.team = _.clone(this.initialState);
      
      this.submitEdit = function() {
        this.submitFunction({edit: this.team});
        this.team = _.clone(this.initialState);
      }
    }];
  
    return {
      templateUrl: 'app/directives/editTeam/editTeam.html',
      restrict: 'E',
      scope: {
        initialState: '=',
        submitFunction: '&',
        message: '@'
      },
      controller: controller,
      controllerAs: 'editTeamCtrl',
      bindToController: true
    };
  }]);
