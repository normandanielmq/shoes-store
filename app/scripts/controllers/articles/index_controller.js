'use strict';

app.controller('ArticlesCtrl', ['$scope', 'Article', 'CONSTANTS', 'Store', '$anchorScroll',
    function ($scope, Article, CONSTANTS, Store, $anchorScroll) {

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

        // Hide the modal confirmation message by default
        $scope.modalShown = false; // Hide all modal windows by default
        $scope.$watch(function () {
            return $scope.modalShown;
        }, function (value) {
            if (value) {
                $anchorScroll();
            }
        })
        $scope.showDeleteConfirmation = function (id) {
            $scope.removeRecordId = id;
            $scope.modalShown = true;
        };

        /**
         * Removes a record
         * @param index
         */
        $scope.remove = function () {
            $scope.clearMessages($scope);

            if(Article.remove($scope.removeRecordId)){
                angular.forEach($scope.articles, function(article, index){
                    if(article.id == $scope.removeRecordId){
                        $scope.articles.splice(index, 1);
                        $scope.successMessages.push(CONSTANTS.MESSAGE.RECORD_DELETED);
                        return false;
                    }
                });
            } else {
                $scope.errorMessages.push(CONSTANTS.MESSAGE.DELETE_RESTRICTION);
            }
            $scope.modalShown = false;
        }
    }
]);