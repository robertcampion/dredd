'use strict';

describe('Directive: editTeam', function () {

  // load the directive's module and view
  beforeEach(module('dreddApp'));
  beforeEach(module('app/directives/editTeam/editTeam.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-team></edit-team>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the editTeam directive');
  }));
});
