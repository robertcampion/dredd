'use strict';

describe('Service: timesync', function () {

  // load the service's module
  beforeEach(module('dreddApp'));

  // instantiate service
  var timesync;
  beforeEach(inject(function (_timesync_) {
    timesync = _timesync_;
  }));

  it('should do something', function () {
    expect(!!timesync).toBe(true);
  });

});
