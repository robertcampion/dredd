'use strict';

angular.module('dreddApp')
  .directive('dreddGame', function () {
    return {
      templateUrl: 'app/dreddGame/dreddGame.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
