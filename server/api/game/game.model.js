'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GameSchema = new mongoose.Schema({
  dateCompleted: Number,
  queueOrder: Number,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  currentState: Object,
  events: [{
    time: Number,
    previousState: Object
  }]
});

export default mongoose.model('Game', GameSchema);
