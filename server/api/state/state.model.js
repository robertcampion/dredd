'use strict';

import config from '../../config/environment';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StateSchema = new mongoose.Schema({
  // points; scores = basePoints * pointMultipliers + extraPoints
  basePoints:       [Number],
  pointMultipliers: [Number],
  extraPoints:      [Number],
  // counts; for each team, map prototype ids to counts (undefined=0)
  counts:           [mongoose.Schema.Types.Mixed]
},
{
  toObject: { virtuals: false },
  toJSON:   { virtuals: true }
});

StateSchema.statics.newInitialState = function() {
  var n = config.numTeams;
  return {
    basePoints:       Array(n).fill(0),
    pointMultipliers: Array(n).fill(1),
    extraPoints:      Array(n).fill(0),
    counts: Array(n).fill().map(() => { return { not: 'empty' } })
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
