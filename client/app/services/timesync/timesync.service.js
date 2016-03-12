'use strict';

angular.module('dreddApp')
  .factory('timesync', ['$http', '$timeout', function ($http, $timeout) {
    
    this.offset = 0;
    this.first = true;
    
    this.sync = () => {
      var sent = Date.now();
      $http.get('/timesync').then(response => {
        var received = Date.now();
        var server = response.data.now;
        this.offset = server - (sent + received) / 2;
        console.log('offset:', this.offset);
        console.log('ping:', received - sent);
        var delay = (60 + 15 * Math.random()) * 1000;
        if(this.first) {
          this.first = false;
          delay = 3000;
        }
        $timeout(this.sync, delay);
      });
    };
    
    this.sync();
    
    return {
      now: () => (Date.now() + this.offset)    
    };
  }]);
