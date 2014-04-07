'use strict';

app.controller('HomeCtrl', ['$scope', 'Article', 'CONSTANTS', 'ArticleImage',
    function ($scope, Article, CONSTANTS, ArticleImage) {

        // Retrieve data when they are ready
        var stop = $scope.$watch(function () {
            return $scope.showLoading;
        }, function (isRunning) {
            if (!isRunning) {

                // Retrieve articles with its images
                $scope.slides = Article.query();
                angular.forEach($scope.slides, function (slide) {
                    slide.images = ArticleImage.getImagesByArticle(slide.id);
                    slide.active = false;
                });
                slide[0].active = true;

                stop();
            }
        });
        $scope.predicate = 'name';
        $scope.myInterval = 5000;
    }
]);
