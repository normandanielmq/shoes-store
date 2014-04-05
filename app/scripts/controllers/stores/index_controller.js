'use strict';

app.controller('EntityCtrl', ['$scope', 'entities', 'categories',
    function ($scope, entities, categories) {
        $scope.entities = entities;

        /**
         * Bind a category name with the entity showed
         */
        (function () {
            var getCategoryName = function (categoryId) {
                var result = 'NOT FOUND';
                angular.forEach(categories, function (category) {
                    if (category.id == categoryId) {
                        result = category.name;
                        return false;
                    }
                })
                return result;
            }
            // Associate all entities with his category name
            angular.forEach($scope.entities, function (entity) {
                entity.category = getCategoryName(entity.categoryId);
            });
        })();

        /**
         * Removes a record
         * @param index Number
         */
        $scope.delete = function (index) {
            $scope.entities[index].$delete(function (res) {
                $scope.entities.splice(index, 1);
            });
        }


    }
]);