'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TeamSchema = new mongoose.Schema({
  name:   String,
  school: String
});

export default mongoose.model('Team', TeamSchema);
