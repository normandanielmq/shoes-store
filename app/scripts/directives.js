'use strict';

app.directive('coloredMessage',
    function () {
        return {
            restrict: 'A',
            template: '<div ng-repeat="content in messages track by $index">' +
                '<div class="alert alert-{{messageType}}">' +
                '{{content}}' +
                '</div>' +
                '</div>',
            scope: {
                messageType: '=',
                messages: '='
            }
        }
    }
);


/*
 Allow only numeric values in a text field
 */
app.directive('onlyNumbers', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                if (!inputValue) {
                    return;
                }
                var transformedInput = (function () {
                    // Extract only numeric values
                    var onlyNumbers = '',
                        newInputValue = inputValue.replace(/ /g, '')
                    for (var i = 0; i < newInputValue.length; i++) {
                        if (!isNaN(newInputValue[i]) || newInputValue[i] == '.') {
                            onlyNumbers += newInputValue[i];
                        }
                    }
                    return onlyNumbers;
                })();

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

/**
 * Set the focus on the element given
 */
app.directive('autoFocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (_scope, _element) {
            _element[0].focus();
        }
    };
}]);

app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function (scope, element, attrs) {
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template:
            "<div class='ng-modal' ng-show='show'>" +
                "<div class = 'ng-modal-overlay' ng-click='hideModal()'></div>" +
                "<div class='ng-modal-dialog'>" +
                    "<div class='ng-modal-close' ng-click='hideModal()'>" +
                        "<button type='button' class='close' aria-hidden='true'>&times;</button>" +
                    "</div>" +
                    "<div class='ng-modal-dialog-content' ng-transclude></div>" +
                "</div>" +
            "</div>"
    };
});
