'use strict';

describe('Directive: game', function () {

  // load the directive's module and view
  beforeEach(module('dreddApp'));
  beforeEach(module('app/directives/game/game.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game></game>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the game directive');
  }));
});
