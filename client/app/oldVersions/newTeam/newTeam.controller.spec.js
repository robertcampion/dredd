'use strict';

describe('Controller: NewTeamCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var NewTeamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewTeamCtrl = $controller('NewTeamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
