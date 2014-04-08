'use strict';

var securePrefix = '',
  RouteManager = {
      securePrefix: securePrefix,
      // General routes for public access
      home: '/',

      // Admin routes
      stores: {
          index: securePrefix + '/stores/',
          edit: securePrefix + '/stores/:id/edit',
          new: securePrefix + '/stores/new'
      },
      articles: {
          index: securePrefix + '/articles/',
          edit: securePrefix + '/articles/:id/edit',
          new: securePrefix + '/articles/new'
      },

      // Shop
      shop: {
          list: '/shop/',
          show: '/shop/:id/show',
          cart: '/shop/cart'
      },

      // Transform the route in a valid value
      path: function (newRoute, variables) {
          if (variables !== undefined) {
              // Replace optional parameters
              angular.forEach(variables, function (v, k) {
                  newRoute = newRoute.replace(':' + k + '?', v);
              });
              // Replaces opr
              angular.forEach(variables, function (v, k) {
                  newRoute = newRoute.replace(':' + k, v);
              });
          }
          return newRoute;
      }
  };

var app = angular.module('shoesStore',
  ['ngResource', 'ngRoute', 'ui.bootstrap', 'LocalStorageModule', 'angular-carousel']);

app.config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
          $routeProvider
            .when(RouteManager.home, {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })

              // Shop
            .when(RouteManager.shop.list, {
                templateUrl: 'views/shop/list.html',
                controller: 'ShopListCtrl'
            })
            .when(RouteManager.shop.show, {
                templateUrl: 'views/shop/show.html',
                controller: 'ShopShowCtrl'
            })
            .when(RouteManager.shop.cart, {
                templateUrl: 'views/shop/cart.html',
                controller: 'ShopCartCtrl'
            })

              // Stores
            .when(RouteManager.stores.index, {
                templateUrl: 'views/stores/index.html',
                controller: 'StoresCtrl'
            })
            .when(RouteManager.stores.edit, {
                templateUrl: 'views/stores/edit.html',
                controller: 'StoresEditCtrl'
            })
            .when(RouteManager.stores.new, {
                templateUrl: 'views/stores/new.html',
                controller: 'StoresNewCtrl'
            })

              // Articles
            .when(RouteManager.articles.index, {
                templateUrl: 'views/articles/index.html',
                controller: 'ArticlesCtrl'
            })
            .when(RouteManager.articles.edit, {
                templateUrl: 'views/articles/edit.html',
                controller: 'ArticlesEditCtrl'
            })
            .when(RouteManager.articles.new, {
                templateUrl: 'views/articles/new.html',
                controller: 'ArticlesNewCtrl'
            })

              // Any other not mapped route
            .otherwise({
                redirectTo: RouteManager.home
            });
          $locationProvider.html5Mode(false);
      }
  ])

  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('');
  }])

  .run(['CONSTANTS', '$rootScope', 'DatabaseFixtures', 'PurchasedArticle', '$anchorScroll',
      function (CONSTANTS, $rootScope, DatabaseFixtures, PurchasedArticle, $anchorScroll) {
          $rootScope.RouteManager = RouteManager;
          $rootScope.CONSTANTS = CONSTANTS; // Global constants

          // Load database on startup
          DatabaseFixtures.load();

          /**
           * Creates three arrays with messages to be displayed using the directive
           * @param scope Controller $scope variable
           */
          $rootScope.clearMessages = function (scope) {
              scope.errorMessages = [];
              scope.successMessages = [];
              scope.infoMessages = [];
          }

          /* Got to top when content is loaded */
          $rootScope.$on('$viewContentLoaded', function () {

              // Scroll to Top
              //$rootScope.$broadcast('scroll.scrollTop')
              $anchorScroll();
          });

          /**
           * Updates the side panel with the payment information
           */
          $rootScope.updatePaymentInfo = function () {
              var subTotal = 0;
              angular.forEach($rootScope.purchasedArticles, function (purchasedArticle) {
                  subTotal += purchasedArticle.article.price * purchasedArticle.quantity;
              });
              var taxes = subTotal * (CONSTANTS.TAX_PERCENTAGE / 100),
                  shipping = subTotal + taxes > CONSTANTS.FREE_SHIPPING_OVER ? 0 : CONSTANTS.SHIPPING_COST;
              $rootScope.paymentInfo = {
                  subTotal: subTotal,
                  taxes: taxes,
                  shipping: shipping,
                  total: subTotal + taxes + shipping
              }
          };

          // Retrieve data
          $rootScope.purchasedArticles = PurchasedArticle.query();
          $rootScope.updatePaymentInfo();

          /**
           * Removes a record
           * @param index
           */
          $rootScope.removePurchasedArticle = function (purchasedArticleId) {
              $rootScope.clearMessages($rootScope);

              if (PurchasedArticle.remove(purchasedArticleId)) {
                  angular.forEach($rootScope.purchasedArticles, function (purchasedArticle, index) {
                      if (purchasedArticle.id == purchasedArticleId) {
                          $rootScope.purchasedArticles.splice(index, 1);
                          $rootScope.updatePaymentInfo();
                          return false;
                      }
                  });
              } else {
                  $rootScope.errorMessages.push(CONSTANTS.MESSAGE.DELETE_RESTRICTION);
              }
          }
      }])

;