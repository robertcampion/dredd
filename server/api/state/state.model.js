'use strict';

import config from '../../config/environment'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StateSchema = new mongoose.Schema({
  // points; scores = basePoints * pointMultipliers + extraPoints
  basePoints:       { type: [Number] },
  pointMultipliers: { type: [Number] },
  extraPoints:      { type: [Number] },
  // counts; for each team, map prototype ids to counts (undefined=0)
  counts:           { type: [Object] }
});

StateSchema.statics.newInitialState = function(n) {
  if(n < 0 || n > config.maxTeams) {
    return 'Bad number of teams "' + n + '"';
  }
  return {
    basePoints:       Array(n).fill(0),
    pointMultipliers: Array(n).fill(1),
    extraPoints:      Array(n).fill(0),
    counts: Array(n).fill().map(() => { return {}; })
  };
}

StateSchema.virtual('scores')
  .get(function() {
    var scores = [];
    for(var i = 0; i < this.basePoints.length; i++) {
      scores[i] = this.basePoints[i] * this.pointMultipliers[i] + this.extraPoints[i];
    }
    return scores;
  });

export default mongoose.model('State', StateSchema);
