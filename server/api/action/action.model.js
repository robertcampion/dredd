'use strict';

import config from '../../config/environment'
import _ from 'lodash'

var mongoose = require('mongoose');

var State = require('../state/state.model');

var ActionSchema = new mongoose.Schema({
  prototypeId: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  kind: { type: String, required: true },
  value: { type: Number, required: true },
  previousState: { type: State.schema, required: true },
  gameTime: { type: Number, default: -1, required: true }
});

ActionSchema.methods.applyToState = function(state) {
  this.previousState = state;
  if(state.toObject) {
    state = state.toObject();
  }
  var newState = _.cloneDeep(state);
  
  newState._id = new mongoose.Types.ObjectId();
  
  var teamIndex = this.parent().teams.indexOf(this.team);
    
  if(teamIndex == -1) {
    console.log('Warning, skipping event for team ' + ' not in game!')
    return newState;
  }
  
  //console.log('teamIndex:', teamIndex);
  //console.log('newState:', newState);
  
  var prevCount = newState.counts[teamIndex][this.prototypeId] || 0;
  
  // we will never reach the maximum if count is undefined in the prototype
  // which means that the count is unlimited; this is what we want, yay!
  if(prevCount == config.actionPrototypes[this.prototypeId].count ) {
    return newState;
  }
  
  //console.log('prevCount OK');
  
  switch(this.kind) {
    case 'points':
      newState.extraPoints[teamIndex] += this.value * newState.pointMultipliers[teamIndex];
      break;
    case 'extra':
      newState.extraPoints[teamIndex] += this.value;
      break;
    case 'multiplier':
      newState.pointMultipliers[teamIndex] *= this.value;
      break;
    default:
      console.log('Bad event type "' + this.type + '"');
  }
  
  //console.log('switch OK')
  
  newState.counts[teamIndex][this.prototypeId] = prevCount + 1;
     
  //console.log('returning');
  
  return newState;
}

/*
// recursively call applyToState on this and all subsequent games, and end
// by setting the game's current state.
//
// if !state, figure out what the current game state is, otherwise
// iterate on the provided state
ActionSchema.methods.updateGameState = function(state) {
  return Promise.all([
    // find the earliest action in this game that happened after this one
    // (i.e. the next action)
    mongoose.model('Action').findOne(
      { game: this.game, gameTime: { $gt: this.gameTime } },
      {},
      { sort : { gameTime : +1 }}
    ).then(),
    mongoose.model('Game').findById(this.game).then()
  ]).then((arr) => {
    var nextAction = arr[0];
    var game       = arr[1];
    
    if(!state) {
      if(nextAction) {
        state = nextAction.previousState;
      }
      else {
        state = game.currentState;
      }
    }
    
    return this.applyToState(state).then((newState) => {
      this.save();
      if(nextAction) {
        nextAction.updateGameState(newState);
      }
      else {
        game.currentState = newState;
        game.save();
      }
    });
  });
}

// same as the previous method, but instead remove this event from the chain
ActionSchema.methods.removeFromGame = function() {
  return Promise.all([
    // find the earliest action in this game that happened after this one
    // (i.e. the next action)
    mongoose.model('Action').findOne(
      { game: this.game, gameTime: { $gt: this.gameTime } },
      {},
      { sort : { gameTime : +1 }}
    ).then(),
    mongoose.model('Game').findById(this.game).then()
  ]).then((arr) => {
    var nextAction = arr[0];
    var game       = arr[1];
    
    if(nextAction) {
      return nextAction.updateGameState(this.previousState);
    }
    else {
      game.currentState = this.previousState;
      game.save();
      return;
    }   
  });
}
*/

export default mongoose.model('Action', ActionSchema);
