(function () {
    var _imagePath = 'approot/images/';
    var module = angular.module('app-framework');

    module.controller('homeCtrl', ['$scope', homeCtrl]);

    function homeCtrl($scope) {
        $scope.techs = getTechs();
        $scope.devs = getDevs();
        $scope.todos=getTodos();
        $scope.tech_name = "";
        $scope.dev_name = "";
        $scope.showName = showName;
        $scope.hideName = hideName;
        $scope.linkedIn = _imagePath + "linkedin.png";


        function showName(name_type, name) {
            switch (name_type) {
                case 'tech_name':
                    $scope.tech_name = name;
                    break;
                case 'dev_name':
                    $scope.dev_name = name;
                    break;
            }


        }

        function hideName() {
            $scope.tech_name = "";
            $scope.dev_name = "";
        }
    }

    function getTechs() {

        var techs =
            [
                {img: "HTML5.png", name: 'HTML 5 & CSS 3', url: 'http://www.w3schools.com/html/html5_intro.asp'},
                {img: "angular.png", name: 'AngularJs (javascript framework)', url: 'https://angularjs.org/'},
                {img: "bootstrap.png", name: 'Twitter Bootstrap (css framework)', url: 'http://getbootstrap.com/'},
                {img: "sass.png", name: "Sass (stylesheet language)", url: 'http://sass-lang.com/'},
                {img: "underscore.png", name: 'lodash.js (javascript library)', url: 'https://lodash.com/'},
                {
                    img: "responsive-design2.png",
                    name: 'Responsive web design',
                    url: 'https://en.wikipedia.org/wiki/Responsive_web_design'
                },
                {
                    img: "rest_api.png",
                    name: 'RESTful API',
                    url: 'https://en.wikipedia.org/wiki/Representational_state_transfer'
                },
                {
                    img: "fontawesome.png",
                    name: 'Font Awesome (iconic font & css tools)',
                    url: 'http://fortawesome.github.io/Font-Awesome/'
                }
            ];
        return angular.forEach(techs, function (tech) {
            tech.img = _imagePath + tech.img;
        })
    }

    function getDevs() {

        var techs =
            [
                {img: "webStorm.png", name: 'JetBrain WebStorm (Dev IDE)', url: 'https://www.jetbrains.com/webstorm/'},
                {
                    img: "chrome.png",
                    name: 'Chrome DevTools (web debugging)',
                    url: 'https://developer.chrome.com/devtools'
                },
                {img: "git.gif", name: 'git (version control system)', url: 'https://git-scm.com/'},
                {
                    img: "github.png",
                    name: 'GitHub (web-based Git repository service)',
                    url: 'https://github.com/'
                },
                {img: "npm.png", name: "node.js + npm (package manager)", url: 'https://www.npmjs.com/'},
                {img: "bower.png", name: 'Twitter Bower (web-dev package manager)', url: 'http://bower.io/'},
                {img: "gulp.png", name: 'gulp.js (project build system)', url: 'http://gulpjs.com/'}
            ];
        return angular.forEach(techs, function (tech) {
            tech.img = _imagePath + tech.img;
        })
    }

    function getTodos(){
        return [
            'Move the Northwind data to Firebase','Rewrite all lib modules with TypeScript',
            'Rewrite all app modules with AngularJs 2.0','And more ...'
        ]
    }
})();

