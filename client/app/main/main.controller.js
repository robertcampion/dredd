'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
    
    this.debug = '';

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      //var responsePromise = this.$http.post('/api/things', { name: this.newThing });
      var responsePromise = this.$http({method:'POST', type:'POST', url:'/api/things', data:{ name: this.newThing }});
      this.newThing = '';
      
      var outerThis = this;
      
      responsePromise.then(
        function(res) {outerThis.debug = 'success:\n' + JSON.stringify(res, null, 2)},
        function(err) {outerThis.debug = 'failure:\n' + JSON.stringify(err, null, 2)},
        function(data) {outerThis.debug = 'notify:\n' + JSON.stringify(data, null, 2)});
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('dreddApp')
  .controller('MainController', MainController);

})();
