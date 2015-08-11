module.exports = function () {
    var approot = './approot';
    var rainModule='./rainModules';
    var bower_libs = './bower_components';
    var extra_libs ='./libs';   // manually added, cannot be installed by bower


    var config = {
        approot: approot,
        rainModule:rainModule,
        rainModuleTmp:rainModule+'/tmp',
        temp: './tmp/',
        distribution: './dist',
        appJs: getAppJs(approot),
        appCss: getAppCss(approot),
        vendorJs: getVendorJs(bower_libs,extra_libs),
        vendorJsMap: getVendorJsMap(bower_libs),
        vendorCss: getVendorCss(bower_libs, extra_libs),
        vendorCssMap: bower_libs + "/**/*.css.map",
        vendorFonts: getVendorFonts(bower_libs)
    };
    return config;
};

function getAppJs(approot) {
    return [approot + '/**/*.js'];
}

function getAppCss(approot) {
    return [approot + '/**/*.css'];
}

function getVendorJs(bower_libs,extra_libs) {
    return [
        // bower_libs
        bower_libs + "/jquery/dist/jquery.min.js",
        bower_libs + "/angular/angular.min.js",
        bower_libs + "/angular-sanitize/angular-sanitize.min.js",
        bower_libs + "/ui-router/release/angular-ui-router.js",
        bower_libs + "/angular-animate/angular-animate.min.js",
        bower_libs + "/angular-messages/angular-messages.min.js",
        bower_libs + "/angular-mocks/angular-mocks.js",
        bower_libs + "/bootstrap/dist/js/bootstrap.min.js",
        bower_libs + "/lodash/lodash.min.js",
        bower_libs + "/toastr/toastr.min.js",
        bower_libs + "/Chart.js/Chart.min.js",
        bower_libs + "/angular-chart.js/dist/angular-chart.min.js",
        bower_libs + "/angular-ui-select/dist/select.min.js",
        // extra_libs
        extra_libs + "/ui-bootstrap-tpls-0.13.3.min.js"
    ];
}

function getVendorCss(bower_libs, extra_libs) {
    return [
        bower_libs + "/bootstrap/dist/css/bootstrap.css",
        bower_libs + "/fontawesome/css/font-awesome.css",
        bower_libs + "/toastr/toastr.min.css",
        bower_libs + "/angular-chart.js/dist/angular-chart.css",
        bower_libs + "/angular-ui-select/dist/select.css",
        extra_libs + "/animate.css"
    ]
}

function getVendorFonts(bower_libs) {
    return [
        bower_libs + '/fontawesome/fonts/**/*.*',
        bower_libs + '/bootstrap/dist/fonts/**/*.*'
    ];
}

function getVendorJsMap(bower_libs) {
    return [
        bower_libs + '/angular-chart.js/dist/angular-chart.min.js.map',
        bower_libs + '/angular-messages/angular-messages.min.js.map'
    ];
}