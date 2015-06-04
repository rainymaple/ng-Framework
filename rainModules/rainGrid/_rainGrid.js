(function () {
    var app=angular.module('rain.grid', []);

    var config = {
        baseUrl: 'rainModules/rainGrid/',
        version: '1.0.0'
    };

    app.value("rainGridConfig", config);

})();