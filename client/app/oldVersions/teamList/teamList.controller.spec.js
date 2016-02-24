'use strict';

describe('Controller: TeamListCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var TeamListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamListCtrl = $controller('TeamListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
