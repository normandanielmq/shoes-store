'use strict';

app.controller('StoresEditCtrl',
  ['$scope', 'Store', 'CONSTANTS', '$location', '$routeParams',
      function ($scope, Store, CONSTANTS, $location, $routeParams) {
          // Retrieve data when they are ready
          var stop = $scope.$watch(function () {
              return $scope.showLoading;
          }, function (isRunning) {
              if (!isRunning) {
                  $scope.store = Store.get($routeParams.id);
                  stop();
                  if($scope.store == null){
                      $location.path(RouteManager.stores.index);
                  }
              }
          });

          $scope.save = function () {
              $scope.clearMessages($scope);

              var success = Store.update($scope.store);
              if (success) {
                  $location.path(RouteManager.stores.index);
              } else {
                  $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
              }
          }
      }
  ]);