'use strict';

describe('Controller: NewGameCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var NewGameCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewGameCtrl = $controller('NewGameCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
