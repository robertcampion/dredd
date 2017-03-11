'use strict';

var mongoose = require('mongoose');

var TeamEvents = require('./team.events');

var TeamSchema = new mongoose.Schema({
  name:    { type: String,                  required: true  },
  school:  { type: String,                  required: false },
  weighed: { type: Boolean, default: false, required: true }
});

// Register the event emitter to the model events
['save', 'remove'].forEach(e => {
  TeamSchema.post(e, doc => {
    TeamEvents.emit(e + ':' + doc._id, doc);
    TeamEvents.emit(e, doc);
  });
});

export default mongoose.model('Team', TeamSchema);
