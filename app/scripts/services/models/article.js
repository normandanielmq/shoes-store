'use strict';

app.factory('Article', ['localStorageService', 'CONSTANTS', 'ArticleImage',
    function (localStorageService, CONSTANTS, ArticleImage) {
        return new function () {
            var self = this;

            /**
             * Creates a new model object
             */
            this.newInstance = function () {
                return {
                    id: Math.random(),
                    name: '',
                    description: '',
                    price: '',
                    totalInShelf: '',
                    totalInVault: '',
                    storeId: '',
                    flag: CONSTANTS.ARTICLE_FLAG.NONE
                }
            };

            /**
             * Creates a new record in the database
             */
            this.save = function (article) {
                var success = true;
                try {
                    var articles = self.query();
                    articles.push(article);
                    localStorageService.set(CONSTANTS.STORAGE_KEY.ARTICLES, articles);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Retrieves a list of articles
             * @returns Array
             */
            this.query = function () {
                return localStorageService.get(CONSTANTS.STORAGE_KEY.ARTICLES) || [];
            };

            /**
             * Retrieves a single article
             * @returns Array
             */
            this.get = function (articleId) {
                var result = null,
                  articles = self.query();
                angular.forEach(articles, function (article) {
                    if (article.id == articleId) {
                        result = article;
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
                    var articles = self.query();
                    angular.forEach(articles, function (article, index) {
                        if (article.id == updatedArticle.id) {

                            // Replace with the new object
                            articles[index] = updatedArticle;
                            return false;
                        }
                    });
                    // Update local storage
                    localStorageService.set(CONSTANTS.STORAGE_KEY.ARTICLES, articles);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Removes a article from the database
             * @param articleId
             * @returns boolean Success flag
             */
            this.remove = function (articleId) {
                var success = true;
                try {
                    // Remove images references
                    success = ArticleImage.removeImagesByArticle(articleId);
                    if (success) {

                        // Remove the record
                        var articles = self.query();
                        angular.forEach(articles, function (article, index) {
                            if (article.id == articleId) {

                                // Remove from local storage
                                articles.splice(index, 1);
                                localStorageService.set(CONSTANTS.STORAGE_KEY.ARTICLES, articles);

                                // Break the cycle
                                return false;
                            }
                        })
                    }
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Fetches the articles of the store received
             * @param storeId
             * @returns {Array}
             */
            this.getArticlesByStore = function(storeId){
                // Retrieve al articles
                var articles = self.query(),
                    result = [];

                // Select only articles with the same store id
                angular.forEach(articles, function(article){
                    if(article.storeId == storeId){
                        result.push(article);
                    }
                });

                return result;
            }
        };
    }
]);