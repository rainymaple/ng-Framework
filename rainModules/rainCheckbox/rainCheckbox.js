(function () {
    var app =angular.module('rainCheckbox',[]);
    app.directive('rainCheckbox', [rainCheckboxDirective]);

    function rainCheckboxDirective() {
        return {
            restrict: "AE",
            template: getTemplate(),
            replace: false,
            scope: {
                rainCheckbox: '=',
                text: '@',
                readonly: '='
            },
            controller: function ($scope) {
                $scope.onclick = function () {
                    if ($scope.readonly === true) {
                        return;
                    }
                    $scope.rainCheckbox = !$scope.rainCheckbox;
                }
            }
        }
    }

    function getTemplate() {
        return '<div class="rain-checkbox-container">' +
            '<div class="checkbox-image">'+
            '<div  class="rain-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox" style="display: inline;"/>' +
            '<label class="checkbox-label" ng-click="onclick()"></label>' +
            '</div>' +
            '</div>' +
            '<div class="checkbox-text">' +
            '{{text}}</div>' +
            '</div>';
    }
})();