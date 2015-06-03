(function () {
    var module =angular.module('rain.numberOnly',[]);
    module.directive('numberOnly',numberOnly);
    function numberOnly(){
        return {
            restrict: 'EA',
            require: 'ngModel',

            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    if(!newValue) return;
                    var splitArray = String(newValue).split("");
                    if (splitArray.length === 0) return;
                    if (splitArray.length === 1
                        && (splitArray[0] == '-'
                        || splitArray[0] === '.' )) return;
                    if (splitArray.length === 2
                        && newValue === '-.') return;
                    if (splitArray.indexOf('.') > 0) {
                        var decimal = attrs['numberOnly'];
                        if (['0', '1', '2', '3', '4', '5'].indexOf(decimal) >= 0) {
                            decimal = parseInt(decimal);
                            if (splitArray.length - splitArray.indexOf('.') > decimal + 1) {
                                ngModel.$setViewValue(oldValue);
                                ngModel.$render();
                            }
                        }
                    }

                    /*Check it is number or not.*/
                    if (isNaN(newValue)) {
                        ngModel.$setViewValue(oldValue);
                        ngModel.$render();
                    }
                });
            }
        };
    }
})();
