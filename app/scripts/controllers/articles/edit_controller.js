'use strict';

app.controller('CategoryEditCtrl', ['$scope', '$location', 'category', 'CONSTANTS',
    function ($scope, $location, category, CONSTANTS) {
        $scope.category = category;

        $scope.save = function () {
            $scope.$parent.clearMessages($scope);

            // Update the model
            $scope.category.$update(
              function (success) {
                  $location.path(RouteManager.categories.index);
              },
              function (error) {
                  $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
              }
            );
        }
    }
]);
