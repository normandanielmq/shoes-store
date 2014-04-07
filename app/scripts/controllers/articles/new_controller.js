'use strict';

app.controller('ArticlesNewCtrl', ['$scope', 'Article', 'CONSTANTS', '$location', 'Store',
    function ($scope, Article, CONSTANTS, $location, Store) {

        // Data used to populate the flag drop-down
        $scope.flagList = CONSTANTS.ARTICLE_FLAG.toArray();

        // Data used to populate the stores drop-down
        $scope.stores = Store.query();

        // Create a new empty object
        $scope.article = Article.newInstance();

        /**
         * Updates changes into the database
         */
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