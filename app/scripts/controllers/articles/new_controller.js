'use strict';

app.controller('ArticlesNewCtrl', ['$scope', 'Article', 'CONSTANTS', '$location', 'Store',
    function ($scope, Article, CONSTANTS, $location, Store) {
        $scope.article = Article.newInstance();
        $scope.stores = Store.query();

        $scope.save = function () {
            $scope.clearMessages($scope);

            if (Article.save($scope.article)) {
                $location.path(RouteManager.articles.index);
            } else {
                $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
            }
        }
    }
]);