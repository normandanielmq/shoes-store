'use strict';

app.controller('StoresCtrl', ['$scope', 'Store', 'CONSTANTS',
    function ($scope, Store, CONSTANTS) {

        // Retrieve data when they are ready
        var stop = $scope.$watch(function(){
            return $scope.showLoading;
        }, function(isRunning){
            if(!isRunning){
                $scope.stores = Store.query();
                stop();
            }
        });
        $scope.predicate = 'name';

        /**
         * Removes a record
         * @param index
         */
        $scope.remove = function (storeId) {
            $scope.clearMessages($scope);

            if(confirm(CONSTANTS.MESSAGE.DELETE_CONFIRMATION)){
                if(Store.remove(storeId)){
                    angular.forEach($scope.stores, function(store, index){
                        if(store.id == storeId){
                            $scope.stores.splice(index, 1);
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