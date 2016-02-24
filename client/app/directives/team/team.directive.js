'use strict';

angular.module('dreddApp')
  .directive('team', function () {
    
    var controller = ['$http', function($http) {
      
      this.$http = $http;
      this.editing = false;
      
      this.toggleEdit = function() {
        this.editing = !this.editing;
      }
      
      this.submitEdit = function(edit) {
        this.$http.put('/api/teams/' + this.team._id, edit);
        this.toggleEdit();
      }
      
      this.deleteTeam = function() {
        this.$http.delete('/api/teams/' + this.team._id);
      }
    }];
  
    return {
      templateUrl: 'app/directives/team/team.html',
      restrict: 'E',
      scope: {
        team: '='
      },
      controller: controller,
      controllerAs: 'teamCtrl',
      bindToController: true
    };
  });
