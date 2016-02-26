'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TeamSchema = new mongoose.Schema({
  name:    { type: String,                  required: true  },
  school:  { type: String,                  required: false },
  weighed: { type: Boolean, default: false, required: true }
});

export default mongoose.model('Team', TeamSchema);
