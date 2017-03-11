'use strict';

import config from '../../config/environment';

var mongoose = require('mongoose');

var State = require('../state/state.model');
var Action = require('../action/action.model');

var GameEvents = require('./game.events');

var GameSchema = new mongoose.Schema({
  // game parameters:
  // duration is in milliseconds!
  // the internal timer always counts up from zero to duration
  // however, the display counts down from duration to zero if clockIncreases is false
  duration:       { type: Number,  default: config.defaultDuration, required: true },
  clockIncreases: { type: Boolean, default: false, required: true },
  teams:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
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
  currentState: { type: State.schema, default: State.newInitialState, required: true },
  actions: [Action.schema]
},
{
  toObject: { virtuals: false },
  toJSON:   { virtuals: true }
});

// Register the event emitter to the model events
['save', 'remove'].forEach(e => {
  GameSchema.post(e, doc => {
    GameEvents.emit(e + ':' + doc._id, doc);
    GameEvents.emit(e, doc);
  });
});

GameSchema.virtual('queued')
  .get(function() {
    return !(this.dateCompleted) && this.queuePosition;
  });

GameSchema.methods.getCurrentGameTime = function() {
  var time = this.gameTimeAtEpoch;
  if(this.clockRunning) {
    time += Date.now() - this.dateAtEpoch;
  }
  return time;
};

GameSchema.methods.startClock = function() {
  this.dateAtEpoch = Date.now();
  this.clockRunning = true;
};

GameSchema.methods.stopClock = function() {
  this.gameTimeAtEpoch = this.getCurrentGameTime();
  this.dateAtEpoch = null;
  this.clockRunning = false;
};

GameSchema.methods.complete = function() {
  this.dateCompleted = Date.now();
};

GameSchema.methods.addAction = function(action) {
  //console.log('adding action: ', action);
  
  action.gameTime = this.getCurrentGameTime();
  
  var insertAt;
  var state = this.currentState;
  for(insertAt = 0; insertAt < this.actions.length; insertAt++) {
    if(action.gameTime < this.actions.gameTime) {
      state = this.actions[insertAt].previousState;
      break;
    }
  }
  
  //console.log('inserting action at: ', insertAt);
  //console.log('starting state: ', state);
  
  this.actions.splice(insertAt, 0, action);
  
  //console.log('added state!');
  
  for(var i = insertAt; i < this.actions.length; i++) {
    state = this.actions[i].applyToState(state);
    //console.log('intermediate state: ', state);
  }
  
  this.currentState = state;
  
  //console.log('final state: ', state);
  
}

GameSchema.methods.removeActionById = function(id) {
  var action = this.actions.id(id);
  if(!action) {
    return;
  }
  
  //console.log('action:', action);
  
  var state = action.previousState;
  var removeAt = this.actions.indexOf(action);
  
  
  
  action.remove();
  
  for(var i = removeAt; i < this.actions.length; i++) {
    state = this.actions[i].applyToState(state);
  }
  
  this.currentState = state;
}

GameSchema.pre('save', function(next) {
  /*if(this.clockRunning && this.dateAtEpoch === null) {
    this.startClock();
  }
  
  if(!this.clockRunning && this.dateAtEpoch !== null) {
    this.stopClock();
  }*/
  
  // get current game time
  /*var currentGameTime = this.gameTimeAtEpoch;
  if(this.clockRunning) {
    currentGameTime += Date.now() - this.dateAtEpoch;
  }*/
  
  // finish game
  if(this.getCurrentGameTime() > this.duration) {
    this.stopClock();
    this.gameTimeAtEpoch = this.duration;
    // don't complete the game immediately: this way the game is kept in
    // the queue and it doesn't disapear from the tablets or scoreboard
    // until manually completed by a judge
    //this.dateCompleted = Date.now();
  }
  
  // make sure state is initialized
  if(this.currentState === null) {
    this.currentState = State.newInitialState();
  }
  
  // make sure length of teams is correct
  while(this.teams.length < config.numTeams) {
    this.teams.push(null);
  }
  
  next();
});

export default mongoose.model('Game', GameSchema);
