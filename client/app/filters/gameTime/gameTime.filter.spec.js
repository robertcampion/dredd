'use strict';

describe('Filter: gameTime', function () {

  // load the filter's module
  beforeEach(module('dreddApp'));

  // initialize a new instance of the filter before each test
  var gameTime;
  beforeEach(inject(function ($filter) {
    gameTime = $filter('gameTime');
  }));

  it('should return the input prefixed with "gameTime filter:"', function () {
    var text = 'angularjs';
    expect(gameTime(text)).toBe('gameTime filter: ' + text);
  });

});
