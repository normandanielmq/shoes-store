'use strict';

app.controller('StoresNewCtrl', ['$scope', 'Store', 'CONSTANTS', '$location',
    function ($scope, Store, CONSTANTS, $location) {
        $scope.store = Store.newInstance();

        $scope.save = function () {
            $scope.clearMessages($scope);

            if (Store.save($scope.store)) {
                $location.path(RouteManager.stores.index);
            } else {
                $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
            }
        }
    }
]);