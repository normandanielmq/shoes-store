'use strict';

app.factory('PurchasedArticle', ['localStorageService', 'CONSTANTS', 'ArticleImage',
    function (localStorageService, CONSTANTS, ArticleImage) {
        return new function () {
            var self = this;

            /**
             * Creates a new model object
             */
            this.newInstance = function (article) {
                return {
                    id: Math.random(),
                    article: article,
                    color: CONSTANTS.COLORS[0].color,
                    size: CONSTANTS.SIZES[0].size,
                    quantity: 1
                }
            };

            /**
             * Creates a new record in the database
             */
            this.save = function (purchasedArticle) {
                var success = true;
                try {
                    var purchasedArticles = self.query();
                    purchasedArticles.push(purchasedArticle);
                    localStorageService.set(CONSTANTS.STORAGE_KEY.PURCHASED_ARTICLE, purchasedArticles);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Retrieves a list of purchasedArticles
             * @returns Array
             */
            this.query = function () {
                return localStorageService.get(CONSTANTS.STORAGE_KEY.PURCHASED_ARTICLE) || [];
            };

            /**
             * Retrieves a single purchasedArticle
             * @returns Object
             */
            this.get = function (purchasedArticleId) {
                var result = null,
                  purchasedArticles = self.query();
                angular.forEach(purchasedArticles, function (purchasedArticle) {
                    if (purchasedArticle.id == purchasedArticleId) {
                        result = purchasedArticle;
                        return false;
                    }
                });
                return result;
            };

            /**
             * Updates an entity
             * @param updatedArticle Article object
             * @returns boolean Success flag
             */
            this.update = function (updatedArticle) {
                var success = true;
                try {
                    // Looking for the record
                    var purchasedArticles = self.query();
                    angular.forEach(purchasedArticles, function (purchasedArticle, index) {
                        if (purchasedArticle.id == updatedArticle.id) {

                            // Replace with the new object
                            purchasedArticles[index] = updatedArticle;
                            return false;
                        }
                    });
                    // Update local storage
                    localStorageService.set(CONSTANTS.STORAGE_KEY.PURCHASED_ARTICLE, purchasedArticles);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Removes a purchasedArticle from the database
             * @param purchasedArticleId
             * @returns boolean Success flag
             */
            this.remove = function (purchasedArticleId) {
                var success = true;
                try {
                    // Remove the record
                    var purchasedArticles = self.query();
                    angular.forEach(purchasedArticles, function (purchasedArticle, index) {
                        if (purchasedArticle.id == purchasedArticleId) {

                            // Remove from local storage
                            purchasedArticles.splice(index, 1);
                            localStorageService.set(CONSTANTS.STORAGE_KEY.PURCHASED_ARTICLE, purchasedArticles);

                            // Break the cycle
                            return false;
                        }
                    })
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Clears the shopping cart
             */
            this.clear = function () {
                localStorageService.set(CONSTANTS.STORAGE_KEY.PURCHASED_ARTICLE, null);
            };
        };
    }
]);