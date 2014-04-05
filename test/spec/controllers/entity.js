'use strict';

describe('Controller: EntityCtrl', function () {

  // load the controller's module
  beforeEach(module('quegcApp'));

  var EntityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntityCtrl = $controller('EntityCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
