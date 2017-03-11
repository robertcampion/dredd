/**
 * Action model events
 */

'use strict';

import {EventEmitter} from 'events';
var ActionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ActionEvents.setMaxListeners(0);

export default ActionEvents;
