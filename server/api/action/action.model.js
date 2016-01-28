'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ActionSchema = new mongoose.Schema({
  type: String
  properties: Object,
  previousState: Object,
  gameTime: Number,
});

export default mongoose.model('Action', ActionSchema);
