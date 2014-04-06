'use strict';

app.factory('Store', ['localStorageService', 'CONSTANTS', 'Article',
    function (localStorageService, CONSTANTS, Article) {
        return new function () {
            var self = this;

            /**
             * Creates a new model object
             */
            this.newInstance = function () {
                return {
                    id: Math.random(),
                    name: '',
                    address: ''
                }
            }

            /**
             * Creates a new record in the database
             */
            this.save = function (store) {
                var success = true;
                try {
                    var stores = self.query();
                    stores.push(store);
                    localStorageService.set(CONSTANTS.STORAGE_KEY.STORES, stores);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Retrieves a list of stores
             * @returns Array
             */
            this.query = function () {
                return localStorageService.get(CONSTANTS.STORAGE_KEY.STORES);
            };

            /**
             * Retrieves a single store
             * @returns Array
             */
            this.get = function (storeId) {
                var result = null,
                  stores = self.query();
                angular.forEach(stores, function (store) {
                    if (store.id == storeId) {
                        result = store;
                        return false;
                    }
                });
                return result;
            };

            /**
             * Updates an entity
             * @param updatedStore Store object
             * @returns boolean Success flag
             */
            this.update = function (updatedStore) {
                var success = true;
                try {
                    // Looking for the record
                    var stores = self.query();
                    angular.forEach(stores, function(store, index){
                        if(store.id == updatedStore.id){

                            // Replace with the new object
                            stores[index] = updatedStore;
                            return false;
                        }
                    });
                    // Update local storage
                    localStorageService.set(CONSTANTS.STORAGE_KEY.STORES, stores);
                } catch (e) {
                    console.log(e);
                    success = false;
                }
                return success;
            };

            /**
             * Removes a store from the database
             * @param storeId
             * @returns boolean Success flag
             */
            this.remove = function (storeId) {
                var success = true;
                try {
                    // Check for referential integrity
                    success = Article.getArticlesByStore(storeId).length == 0;
                    if (success) {

                        // Remove the record
                        var stores = self.query();
                        angular.forEach(stores, function (store, index) {
                            if (store.id == storeId) {

                                // Remove from local storage
                                stores.splice(index, 1);
                                localStorageService.set(CONSTANTS.STORAGE_KEY.STORES, stores);

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
        };
    }
]);