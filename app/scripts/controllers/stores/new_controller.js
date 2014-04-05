'use strict';

app.controller('EntityCtrlNew',
  ['$scope', '$resource', '$location', 'Category', 'CONSTANTS', 'Entity',
      function ($scope, $resource, $location, Category, CONSTANTS, Entity) {
          $scope.entity = new Entity({
              entityStatus: CONSTANTS.ENTITY_STATUS.ACTIVE
          });
          $scope.categories = Category.query(function (success) {
              if ($scope.categories.length > 0) {
                  $scope.entity.categoryId = $scope.categories[0].id
              }
          });
          $scope.statusList = CONSTANTS.ENTITY_STATUS.toArray();

          $scope.save = function () {
              $scope.$parent.clearMessages($scope);
              $scope.entity.$save(
                function (success) {
                    $location.path(RouteManager.entities.index);
                },
                function (error) {
                    $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
                }
              );
          };
      }
  ]);