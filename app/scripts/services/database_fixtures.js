'use strict';

app.factory('DatabaseFixtures', ['localStorageService', '$http', 'CONSTANTS', '$rootScope',
    function (localStorageService, $http, CONSTANTS, $rootScope) {
        return {

            /**
             * Initial database charge into local storage
             * @param data (database.json content)
             */
            load: function () {
                // This is performed only if some key in the local storage doesn't exist
                if (!(CONSTANTS.STORAGE_KEY.STORES in localStorage)
                  || !(CONSTANTS.STORAGE_KEY.ARTICLES in localStorage)
                  || !(CONSTANTS.STORAGE_KEY.ARTICLE_IMAGES in localStorage)) {

                    // Asynchronous call to the server getting database fixtures
                    $rootScope.showLoading = true;
                    $http.get('database.json').success(function (data) {

                        // Store data
                        localStorageService.add(CONSTANTS.STORAGE_KEY.STORES, data.stores);
                        localStorageService.add(CONSTANTS.STORAGE_KEY.ARTICLES, data.articles);
                        localStorageService.add(CONSTANTS.STORAGE_KEY.ARTICLE_IMAGES, data.articleImages);
                        $rootScope.showLoading = false;

                    });

                }
            }
        }
    }
]);
