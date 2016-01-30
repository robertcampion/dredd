'use strict';

import config from '../../config/environment'
import _ from 'lodash'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var State = require('../state/state.model');

var ActionSchema = new mongoose.Schema({
  prototypeId: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  previousState: { type: State.schema, required: true },
  gameTime: { type: Number, default: -1, required: true }
});

ActionSchema.methods.applyToState = function(state) {
  this.previousState = state;
  var newState = _.cloneDeep(state);
  
  return mongoose.model('Game').findOne({ actions: this._id }).exec().then(game => {
    var teamIndex = game.teams.indexOf(this.team);
    
    if(teamIndex == -1) {
      console.log('Warning, skipping event for team ' + ' not in game!')
      return newState;
    }
    
    var prevCount = newState.counts[teamIndex][this.prototypeId] || 0;
    
    // we will never reach the maximum if count is undefined in the prototype
    // which means that the count is unlimited; this is what we want, yay!
    if(prevCount == config.actionPrototypes[this.prototypeId].count ) {
      return;
    }
    
    switch(this.type) {
      case 'points':
        newState.basePoints[teamIndex] += this.value;
        break;
      case 'extra':
        newState.extraPoints[teamIndex] += this.value;
        break;
      case 'multiplier':
        newState.multiplier[teamIndex] *= this.value;
        break;
      default:
        console.log('Bad event type "' + this.type + '"');
    }
    
    newState.counts[teamIndex][this.prototypeId] = prevCount + 1;
       
    return newState;
   });
}

export default mongoose.model('Action', ActionSchema);
