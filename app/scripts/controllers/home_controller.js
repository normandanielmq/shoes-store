'use strict';

app.controller('HomeCtrl', ['$scope', 'Article', 'CONSTANTS', 'ArticleImage',
    function ($scope, Article, CONSTANTS, ArticleImage) {

        // Retrieve data when they are ready
        var stop = $scope.$watch(function () {
            return $scope.showLoading;
        }, function (isRunning) {
            if (!isRunning) {

                // Retrieve articles with its images
                $scope.articles = Article.query();
                angular.forEach($scope.articles, function (article) {
                    article.images = ArticleImage.getImagesByArticle(article.id);
                });

                stop();
            }
        });
        $scope.predicate = 'name';

    }
]);
