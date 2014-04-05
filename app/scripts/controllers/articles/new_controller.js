'use strict';

app.controller('CategoryNewCtrl',
        ['$scope', '$resource', '$location', 'Category', 'CONSTANTS',
        function($scope, $resource, $location, Category, CONSTANTS) {
            $scope.category = new Category({});

            $scope.save = function() {
                $scope.$parent.clearMessages($scope);
                $scope.category.$save(
                    function(success) {
                        $location.path(RouteManager.categories.index);
                    },
                    function(error){
                        $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
                    }
                );
            };
        }
    ]);
