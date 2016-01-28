'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GameSchema = new mongoose.Schema({
  // game parameters:
  // the internal timer always counts up from zero to duration
  // however, the display counts down from duration to zero if clockIncreases is false
  duration:       Number,
  clockIncreases: Boolean,
  teams:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
  // if clockRunning is true, the clock is running, and was equal to gameTimeAtEpoch
  //     when the *server's* wall clock time was equal to dateAtEpoch
  // if clockRunning is false, the clock is paused, and is equal to gameTimeAtEpoch
  // clockRunning should only be true for the current game (as defined below)
  dateAtEpoch:     Date,
  gameTimeAtEpoch: Number,
  clockRunning:    Boolean,
  // if queuePosition exists, the game is in the queue of upcoming games
  // ...except the first game in the queue (if it exists), which is the current game
  // if the game is not in the queue and dateCompleted exists, the game is in the
  //     completed games list
  // otherwise the game is on the 'scratchpad' of unplaced games
  queuePosition: Number,
  dateCompleted: Date,
  // game state, 
  currentState: Object,
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action'}]
});

export default mongoose.model('Game', GameSchema);
