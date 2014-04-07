'use strict';

app.controller('ShopListCtrl', ['$scope', 'Article', 'CONSTANTS', 'Store', 'ArticleImage',
    function ($scope, Article, CONSTANTS, Store, ArticleImage) {

        // Retrieve data when they be ready
        var stop = $scope.$watch(function () {
            return $scope.showLoading;
        }, function (isRunning) {
            if (!isRunning) {
                $scope.articles = Article.query();

                // Retrieve the store and images name to be showed in the list view
                angular.forEach($scope.articles, function (article) {
                    article.images = ArticleImage.getImagesByArticle(article.id)
                });

                stop();
            }
        });

    }
]);