'use strict';

(function() {

class ScoreboardCtrl {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.teams = [];
    this.games = [];
    
    this.game = {};
    
    this.debug = '';
    
    this.currentTeam = 0;

    $http.get('/api/games').then(response => {
      this.games = response.data;
      //socket.syncUpdates('thing', this.awesomeThings);
      if(this.games.length > 0) {
        this.game = this.games[0];
      }
    });
    
    $http.get('/api/teams').then(response => {
      this.teams = response.data;
      //socket.syncUpdates('thing', this.awesomeThings);
    });
    

    $scope.$on('$destroy', function() {
      //socket.unsyncUpdates('thing');
    });
  }

  /*addThing() {
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
  }*/

  testPost() {
	  var responsePromise = this.$http.post('/api/games', { duration: 120, state: { scores: [0, 0, 0, 0]} });
	  
	  responsePromise.then(
	    (res) => {this.debug = 'success:\n' + JSON.stringify(res, null, 2)},
	    (err) => {this.debug = 'failure:\n' + JSON.stringify(err, null, 2)},
	    (data) => {this.debug = 'notify:\n' + JSON.stringify(data, null, 2)});
  }
  
  updateState(oldState, event) {
    var state = JSON.parse(JSON.stringify(oldState)); // ugly hack
    event.previousState = oldState;
    if(event.type == 'm') {
      state.multipliers[event.team] = event.value;
    }
    if(event.type == 'p') {
      state.baseScores[event.team] += event.value;
    }
    for(var i = 0; i < state.scores.length; i++) {
      state.scores[i] = state.baseScores[i] * state.multipliers[i];
    }
    return state;
  }
  
  addEvent(game, event) {
    game.currentState = this.updateState(game.currentState, event);
    game.events.push(event);
    return game;
  }
  
  deleteEvent(game, idx) {
    if(idx < 0 || game.events.length <= idx) { return; }
    var state = game.events[idx].previousState;
    game.events.splice(idx, 1);
    for(var i = idx; i < game.events.length; i++) {
      state = this.updateState(state, game.events[i]);
    }
    game.currentState = state;
    return game;
  }
  
  getTeamNameById(id) {
    for(var i = 0; i < this.teams.length; i++) {
      if(this.teams[i]._id == id) {
        return this.teams[i].name
      }
    }
    return "ERROR";  
  }
}

angular.module('dreddApp')
  .controller('ScoreboardCtrl', ScoreboardCtrl);

})();
