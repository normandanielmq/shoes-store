'use strict';

app.controller('ShopCartCtrl',  ['$scope', 'PurchasedArticle', 'CONSTANTS',
    function ($scope, PurchasedArticle, CONSTANTS) {
        // Purchased articles list has been created in $rootScope

        // Quantities drop-down
        $scope.quantityList = [];
        for(var i = 1; i <= CONSTANTS.MAX_QUANTITY_ON_PURCHASE; i++){
            $scope.quantityList.push({value: i});
        }

        /**
         * Removes all articles
         */
        $scope.clearShoppingCart = function(){
            PurchasedArticle.clear();
            $scope.purchasedArticles = [];
            //$scope.updatePaymentInfo();
        }

    }
]);