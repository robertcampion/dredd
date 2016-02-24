'use strict';

describe('Controller: ModifyGameCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var ModifyGameCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModifyGameCtrl = $controller('ModifyGameCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
