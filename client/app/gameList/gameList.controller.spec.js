'use strict';

describe('Controller: GameListCtrl', function () {

  // load the controller's module
  beforeEach(module('dreddApp'));

  var GameListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameListCtrl = $controller('GameListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
