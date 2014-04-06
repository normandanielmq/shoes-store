'use strict';

app.controller('ArticlesEditCtrl',
  ['$scope', 'Article', 'CONSTANTS', '$location', '$routeParams', 'Store',
      function ($scope, Article, CONSTANTS, $location, $routeParams, Store) {
          // Retrieve data when they are ready
          var stop = $scope.$watch(function () {
              return $scope.showLoading;
          }, function (isRunning) {
              if (!isRunning) {
                  $scope.article = Article.get($routeParams.id);
                  $scope.stores = Store.query();
                  stop();
                  if($scope.article == null){
                      $location.path(RouteManager.articles.index);
                  }
              }
          });

          $scope.save = function () {
              $scope.clearMessages($scope);

              var success = Article.update($scope.article);
              if (success) {
                  $location.path(RouteManager.articles.index);
              } else {
                  $scope.errorMessages.push(CONSTANTS.MESSAGE.ERROR_REQUEST);
              }
          }
      }
  ]);