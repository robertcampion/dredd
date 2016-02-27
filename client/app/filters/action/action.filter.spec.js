'use strict';

describe('Filter: action', function () {

  // load the filter's module
  beforeEach(module('dreddApp'));

  // initialize a new instance of the filter before each test
  var action;
  beforeEach(inject(function ($filter) {
    action = $filter('action');
  }));

  it('should return the input prefixed with "action filter:"', function () {
    var text = 'angularjs';
    expect(action(text)).toBe('action filter: ' + text);
  });

});
