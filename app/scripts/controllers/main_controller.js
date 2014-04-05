'use strict';

/**
 * Involves all the application html, all the variables and function declared
 * in this controller may be accessible by any view and by the nested controllers
 * by using $scope.$parent.<resource>
 */
app.controller('MainCtrl', ['$scope', '$location', 'CONSTANTS', '$http',
    function ($scope, $location, CONSTANTS, $http) {
        $scope.RouteManager = RouteManager; // Declared in app.js
        $scope.CONSTANTS = CONSTANTS; // Global constants
        // Load parameters on startup
        $http.get('parameters.json').success(function (data) {
            CONSTANTS.PARAMETERS = data;
        });

        /*
         * This function intercepts all the changes in the url and checks
         * for a secure path
         */
        $scope.$watch(function () {
                // Watch for changes in the path.
                return $location.path();
            },
            function (newRoute, oldRoute) {
                // Validate if the url has a secure prefix
                if (newRoute.indexOf(RouteManager.securePrefix) !== -1) {
                    // Redirect to login
                }
            });

        /**
         * Creates three arrays with messages to be displayed using the directive
         * @param scope Controller $scope variable
         */
        $scope.clearMessages = function (scope) {
            scope.errorMessages = [];
            scope.successMessages = [];
            scope.infoMessages = [];
        }

        /**
         * Used by ng-class in the navigation menu
         * @param route String with the route to be evaluated
         * @returns {boolean}
         */
        $scope.isActive = function(route) {
            return route === $location.path().substr(0, route.length);
        };
    }
]);