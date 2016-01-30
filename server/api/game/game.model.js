'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var State = require('../state/state.model');

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

GameSchema.methods.rebuildState = function(index, startingState) {
  if(this.index > this.actions.length) {
    return;
  }
  
  

};

GameSchema.pre('save', true, function(next, done) {
  
  next();
  
  // check if the teams list has been modified
  if(this.isModified('teams')) {
  }
  
  done();
  
  //mongoose.model(''
});

GameSchema.pre('save', function(next) {
  // the clock starts now, set epoch
  if(this.clockRunning && this.dateAtEpoch === null) {
    this.dateAtEpoch = Date.now();
  }
  
  // the clock pauses now, set time 
  if(!this.clockRunning && this.dateAtEpoch !== null) {
    this.gameTimeAtEpoch += Date.now() - this.dateAtEpoch;
    this.dateAtEpoch = null;
  }
  
  // get current game time
  var currentGameTime = this.gameTimeAtEpoch;
  if(this.clockRunning) {
    currentGameTime += Date.now() - this.dateAtEpoch;
  }
  
  // finish game
  if(currentGameTime > this.duration) {
    this.clockRunning = false;
    this.gameTimeAtEpoch = this.duration;
    this.dateAtEpoch = null;
    
    this.dateCompleted = Date.now();
  }
  
  // make sure state is initialized
  if(this.currentState === null) {
    this.currentState = State.newInitialState(this.teams.length);
  }
  
  next();
});

export default mongoose.model('Game', GameSchema);
