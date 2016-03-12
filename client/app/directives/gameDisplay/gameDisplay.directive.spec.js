'use strict';

describe('Directive: gameDisplay', function () {

  // load the directive's module and view
  beforeEach(module('dreddApp'));
  beforeEach(module('app/directives/gameDisplay/gameDisplay.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<game-display></game-display>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the gameDisplay directive');
  }));
});
