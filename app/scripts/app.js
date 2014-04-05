'use strict';

var securePrefix = '',
    RouteManager = {
        securePrefix: securePrefix,
        // General routes for public access
        home: '/home',

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

var app = angular.module('shoesStore', ['ngResource', 'ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when(RouteManager.home, {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: RouteManager.home
            });
        $locationProvider.html5Mode(false);
    }
])

;