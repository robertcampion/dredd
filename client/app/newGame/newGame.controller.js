'use strict';

angular.module('dreddApp')
  .controller('NewGameCtrl', function ($http, $scope, socket) {
    
    this.$http = $http;
    
    this.reset = function() {
      this.game = {duration: (5*60*1000), teams: [] };
    }
    
    this.reset();
    
    this.addGame = function() {
      this.$http.post('/api/games', this.game);
      
      this.reset();
    }
    
    this.getTeamById = function(teamId) {
      for(var team of this.teams) {
        if(team._id === teamId) {
          return team;
        }
      }
      return null;  
    }
    
    this.addTeam = function(teamId) {
      this.game.teams.push(teamId);
    }
    
    this.removeTeam = function(teamId) {
      var index = this.game.teams.indexOf(teamId);
      if(index >= 0) {
        this.game.teams.splice(index, 1);
      }
    }
    
    this.$http.get('/api/teams').then(response => {
      this.teams = response.data;
      socket.syncUpdates('team', this.teams);
    });
    
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('team');
    });
    
  });
  
/*

var GameSchema = new mongoose.Schema({
  // game parameters:
  // duration is in milliseconds!
  // the internal timer always counts up from zero to duration
  // however, the display counts down from duration to zero if clockIncreases is false
  duration:       { type: Number,                  required: true },
  clockIncreases: { type: Boolean, default: false, required: true },
  teams:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
  // if clockRunning is true, the clock is running, and was equal to gameTimeAtEpoch
  //     when the *server's* wall clock time was equal to dateAtEpoch
  // if clockRunning is false, the clock is paused, and is equal to gameTimeAtEpoch
  // clockRunning should only be true for the current game (as defined below)
  dateAtEpoch:     { type: Date,    default: null,  required: false },
  gameTimeAtEpoch: { type: Number,  default: 0,     required: true },
  clockRunning:    { type: Boolean, default: false, required: true },
  // if queuePosition exists, the game is in the queue of upcoming games
  // ...except the first game in the queue (if it exists), which is the current game
  // if the game is not in the queue and dateCompleted exists, the game is in the
  //     completed games list
  // otherwise the game is on the 'scratchpad' of unplaced games
  queuePosition: { type: Number, default: null, required: false },
  dateCompleted: { type: Date,   default: null, required: false },
  // game state
  currentState: { type: State.schema },
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action'}]
});

*/
