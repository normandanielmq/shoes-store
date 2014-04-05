'use strict';

app.controller('EntityCtrlEdit', ['$scope', 'entity', 'categories', '$location', 'CONSTANTS',
    function ($scope, entity, categories, $location, CONSTANTS) {
        $scope.categories = categories;
        $scope.entity = entity;
        $scope.statusList = CONSTANTS.ENTITY_STATUS.toArray();

        $scope.save = function () {
            $scope.$parent.clearMessages($scope);

            $scope.entity.$update(
              function (success) {
                  $location.path(RouteManager.entities.index);
              },
              function (error) {
                  $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
              }
            );
        }
    }
]);