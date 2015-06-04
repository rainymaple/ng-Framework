(function () {
    angular.module('app').config(["$provide", function ($provide) {

            $provide.decorator("$exceptionHandler", exceptionDecorator);

            function exceptionDecorator($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                    // toastr.error(exception.message);
                    // console.log(exception.message);
                    // alert(exception.message);
                }
            }
        }]
    )
})();
