'use strict';

describe('Controller: GamesControlsCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var GamesControlsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamesControlsCtrl = $controller('GamesControlsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
