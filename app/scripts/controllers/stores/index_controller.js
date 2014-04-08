'use strict';

app.controller('StoresCtrl', ['$scope', 'Store', 'CONSTANTS', '$anchorScroll',
    function ($scope, Store, CONSTANTS, $anchorScroll) {

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

        // Hide the modal confirmation message by default
        $scope.modalShown = false; // Hide all modal windows by default
        $scope.$watch(function () {
            return $scope.modalShown;
        }, function (value) {
            if(value){
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

            if (Store.remove($scope.removeRecordId)) {
                angular.forEach($scope.stores, function (store, index) {
                    if (store.id == $scope.removeRecordId) {
                        $scope.stores.splice(index, 1);
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