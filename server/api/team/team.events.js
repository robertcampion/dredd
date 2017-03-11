/**
 * Team model events
 */

'use strict';

import {EventEmitter} from 'events';
var TeamEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TeamEvents.setMaxListeners(0);

export default TeamEvents;
