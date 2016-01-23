'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var GlobalSchema = new mongoose.Schema({
  name: String,
  value: {}
});

GlobalSchema.statics = {
  getPropertyByName: function(name) {
    return this.findOneAsync({name: name})
      .then(global => (global === null ? undefined : global.value))
    });
  },
  setPropertyByName: function(name, value) {
    return this.updateAsync({name: name}, {$set:{value: value}}, {upsert: true});
  }
}

export default mongoose.model('Global', GlobalSchema);
