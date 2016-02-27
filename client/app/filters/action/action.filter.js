'use strict';

angular.module('dreddApp')
  .filter('action', ['appConfig', function (appConfig) {
    return function (action, state, teamIdx) {
      
      var str = action.name;
      if(!str) {
        str = appConfig.actionPrototypes[action.prototypeId].name;
      }
      
      if(action.kind == 'points' || action.kind == 'extra' ) {
        str += ', ' + (action.value < 0 ? '−' : '+') + Math.abs(action.value);
      }
      
      if(action.kind == 'multiplier' ) {
        str += ', ×' + action.value;
      }
      
      if(!state) {
        return str;
      }
      
      var count = '';
      if(teamIdx >= 0) {
        count = state.counts[teamIdx][action.prototypeId] || 0;
      }
      
      
      str += ' (' + count;
      
      if(action.count) {
        str += '/' + action.count;
      }
      
      str += ')'
    
      return str;
    };
  }]);
