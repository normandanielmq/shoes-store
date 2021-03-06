'use strict';

app.factory('ArticleImage', ['localStorageService', 'CONSTANTS',
    function (localStorageService, CONSTANTS) {
        return new function () {
            var self = this;

            /**
             * Retrieves a list of articles
             * @returns Array
             */
            this.query = function () {
                return localStorageService.get(CONSTANTS.STORAGE_KEY.ARTICLE_IMAGES) || [];
            };

            /**
             * Removes all images of a given article
             * @param articleId
             * @returns Boolean
             */
            this.removeImagesByArticle = function(articleId){
                var success = true;
                try {
                    // Retrieve all photos
                    var articleImages = self.query();

                    // Since this routine are going to remove elements, it's better to use an inverted for
                    for(var i = articleImages.length - 1; i >= 0; i--){
                        if(articleImages[i].id == articleId){

                            // Remove the image
                            articleImages.splice(i, 1);
                        }
                    }

                    // Update database
                    localStorageService.set(CONSTANTS.STORAGE_KEY.ARTICLE_IMAGES, articleImages);
                }catch (e){
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Fetches for images of a specific article
             * @param articleId
             * @returns {Array}
             */
            this.getImagesByArticle = function(articleId){

                // Retrieve all images
                var articleImages = self.query(),
                    result = [];

                // Filter the array
                angular.forEach(articleImages, function(articleImage){
                    if (articleImage.articleId == articleId){
                        result.push(articleImage);
                    }
                });

                return result;
            }

        };
    }
]);