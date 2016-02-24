'use strict';

angular.module('dreddApp')
  .directive('editTeam', [function() {
  
    var controller = ['$http', function($http) {
      
      this.$http = $http;
      this.newTeam = _.clone(this.team);
      this.editing = false;
      
      this.toggleEdit = function() {
        this.editing = !this.editing;
        this.newTeam = _.clone(this.team);
      }
      
      this.submitEdit = function() {
        this.$http.put('/api/teams/' + this.team._id, this.newTeam);
        this.toggleEdit();
      }
      
      this.deleteTeam = function() {
        this.$http.delete('/api/teams/' + this.team._id, this.newTeam);
      }
    }];
  
    return {
      templateUrl: 'app/directives/editTeam/editTeam.html',
      restrict: 'E',
      scope: {
        team: '='
      },
      controller: controller,
      controllerAs: 'editTeam',
      bindToController: true
    };
  }]);
