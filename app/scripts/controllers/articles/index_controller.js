'use strict';

app.controller('CategoryIndexCtrl', ['$scope', 'categories',
        function($scope, categories) {
            $scope.categories = categories;

            $scope.delete = function(index) {
                $scope.categories[index].$delete(function(res) {
                    $scope.categories.splice(index, 1);
                });
            }
        }
    ]);
