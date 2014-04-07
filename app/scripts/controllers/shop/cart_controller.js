'use strict';

app.controller('ShopCartCtrl',  ['$scope', 'PurchasedArticle', 'CONSTANTS', '$location',
    function ($scope, PurchasedArticle, CONSTANTS) {

        // Retrieve data
        $scope.purchasedArticles = PurchasedArticle.query();

        // Quantities drop-down
        $scope.quantityList = [];
        for(var i = 1; i <= CONSTANTS.MAX_QUANTITY_ON_PURCHASE; i++){
            $scope.quantityList.push({value: i});
        }

        /**
         * Updates the side panel with the payment information
         */
        $scope.updatePaymentInfo = function(){
            var subTotal = 0;
            angular.forEach($scope.purchasedArticles, function(purchasedArticle){
                subTotal += purchasedArticle.article.price * purchasedArticle.quantity;
            });
            var taxes = subTotal * (CONSTANTS.TAX_PERCENTAGE / 100)
            $scope.paymentInfo = {
                subTotal: subTotal,
                taxes: taxes,
                total: subTotal + taxes
            }
        };
        $scope.updatePaymentInfo();

        /**
         * Removes a record
         * @param index
         */
        $scope.remove = function (purchasedArticleId) {
            $scope.clearMessages($scope);

            if (confirm(CONSTANTS.MESSAGE.DELETE_CONFIRMATION)) {
                if (PurchasedArticle.remove(purchasedArticleId)) {
                    angular.forEach($scope.purchasedArticles, function (purchasedArticle, index) {
                        if (purchasedArticle.id == purchasedArticleId) {
                            $scope.purchasedArticles.splice(index, 1);
                            return false;
                        }
                    });
                } else {
                    $scope.errorMessages.push(CONSTANTS.MESSAGE.DELETE_RESTRICTION);
                }
            }
        }

        /**
         * Removes all articles
         */
        $scope.clearShoppingCart = function(){
            PurchasedArticle.clear();
            $scope.purchasedArticles = [];
            $scope.updatePaymentInfo();
        }

    }
]);