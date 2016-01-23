/**
 * Global model events
 */

'use strict';

import {EventEmitter} from 'events';
var Global = require('./global.model');
var GlobalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GlobalEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Global.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GlobalEvents.emit(event + ':' + doc._id, doc);
    GlobalEvents.emit(event, doc);
  }
}

export default GlobalEvents;
