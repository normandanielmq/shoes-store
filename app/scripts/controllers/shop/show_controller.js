'use strict';

app.controller('ShopShowCtrl',
  ['$scope', 'Article', 'CONSTANTS', 'Store', 'ArticleImage', '$routeParams', 'PurchasedArticle', '$location',
    function ($scope, Article, CONSTANTS, Store, ArticleImage, $routeParams, PurchasedArticle, $location) {

        // Retrieve data when they be ready
        var stop = $scope.$watch(function () {
            return $scope.showLoading;
        }, function (isRunning) {
            if (!isRunning) {
                $scope.article = Article.get($routeParams.id);

                // Retrieve the store and images name to be showed in the show view
                $scope.article.store = Store.get($scope.article.storeId);
                $scope.article.images = ArticleImage.getImagesByArticle($scope.article.id);

                $scope.purchase = PurchasedArticle.newInstance($scope.article);

                stop();
            }
        });
        $scope.imageIndex = 0;
        // Quantities drop-down
        $scope.quantityList = [];
        for(var i = 1; i <= CONSTANTS.MAX_QUANTITY_ON_PURCHASE; i++){
            $scope.quantityList.push({value: i});
        }

        /**
         * Saves the purchase into the shopping cart
         * Article information is saved in order to protect the referential integrity
         */
        $scope.addToCart = function(){
            $scope.clearMessages($scope);

            // Add the purchase to the shopping cart
            if (PurchasedArticle.save($scope.purchase)){
                $scope.purchasedArticles.push($scope.purchase);
                $scope.updatePaymentInfo();
                // Redirect to the shopping cart view
                $location.path(RouteManager.shop.cart);
            } else {
                $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
            }
        }
    }
]);