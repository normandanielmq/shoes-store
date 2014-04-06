'use strict';

app.controller('ArticlesCtrl', ['$scope', 'Article', 'CONSTANTS', 'Store',
    function ($scope, Article, CONSTANTS, Store) {

        // Retrieve data when they are ready
        var stop = $scope.$watch(function(){
            return $scope.showLoading;
        }, function(isRunning){
            if(!isRunning){
                $scope.articles = Article.query();
                angular.forEach($scope.articles, function(article){
                    article.store = Store.get(article.storeId);
                });
                // Retrieve the store name to be showed in the index view
                stop();
            }
        });
        $scope.predicate = 'name';

        /**
         * Removes a record
         * @param index
         */
        $scope.remove = function (articleId) {
            $scope.clearMessages($scope);

            if(confirm(CONSTANTS.MESSAGE.DELETE_CONFIRMATION)){
                if(Article.remove(articleId)){
                    angular.forEach($scope.articles, function(article, index){
                        if(article.id == articleId){
                            $scope.articles.splice(index, 1);
                            return false;
                        }
                    });
                } else {
                    $scope.errorMessages.push(CONSTANTS.MESSAGE.DELETE_RESTRICTION);
                }
            }
        }
    }
]);