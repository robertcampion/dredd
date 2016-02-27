'use strict';

angular.module('dreddApp')
  .filter('gameTime', function () {
    return function (milliseconds, game) {
      var time = milliseconds;
      
      if(game && !game.clockIncreases) {
        time = game.duration - time;
      }
      
      var seconds = time / 1000;
      
      if(seconds < 60) {
        return seconds.toFixed(1);
      }
      
      seconds = Math.floor(seconds);
        
      var minutes = Math.floor(seconds / 60);
      
      seconds -= 60 * minutes;
      
      if(seconds == 0) {
        return minutes + ':00';
      }
      if(seconds < 10) {
        return minutes + ':0' + seconds;
      }
      return minutes + ':' + seconds
      
    };
  });
