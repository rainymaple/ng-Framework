(function () {
    var module = angular.module("rainForm");

    module.directive("formInput", formInput);

    /*  -- directive formInput -- */

    function formInput ($compile) {

        return {
            restrict: "A",
            require: "^form",
            link: link($compile)
        };

    }

    // -- functions -- //

    var watcherFor = function (form, name) {
        return function () {
            if (name && form[name]) {
                if (form.$submitted) {
                    return form[name].$invalid;
                }
                if (!form[name].$dirty) {
                    return false;
                }
                return form[name].$invalid;
            }
        };
    };

    var updaterFor = function (element) {
        return function (hasError) {
            if (hasError) {
                element.addClass("has-error");
                element.find('.help-block').show();
                //.removeClass("has-success");
            } else {
                element.removeClass("has-error");
                element.find('.help-block').hide();
                //.addClass("has-success");
            }
        };
    };

    var setupDom = function (element, $compile, scope) {

        if (!element.hasClass('form-group') && element.find('.form-group').length === 0) {
            var html = element.html();
            var newHtml = '<div class="form-group form-group-sm">' + html + '</div>'
            element.html($compile(newHtml)(scope));
        } else {
            element.addClass('form-group-sm');
        }


        var label = element[0].querySelector("label");
        if (label) {
            label.classList.add("control-label");
        }

        var input = element[0].querySelector("input, textarea, select,[ng-model]");
        if (input) {
            var type = input.getAttribute("type");
            var name = input.getAttribute("name");
            if (type !== "checkbox" && type !== "radio") {
                input.classList.add("form-control");
            }
            return name;
        }
    };

    var addMessages = function (form, element, name, $compile, scope) {

        // if ng-messages block already exists, just return.
        if (element.find('div[ng-messages]').length > 0 || element.find('span[ng-messages]').length > 0) {
            return;
        }

        // adding the generic error messages template to the current form
        var formElement = element.closest('form');
        if ($('body').find('#rain-form-error-messages').length === 0) {
            var messageBlock = getGenericErrorMessages();
            $('body').prepend($compile(messageBlock)(scope));
        }

        // adding the ng-messages block
        var messages = "<span class='help-block' ng-messages='" +
            form.$name + "." + name + ".$error" +
            "' ng-messages-include='rain-form-error-messages'>" +
                //"<div ng-message='minlength'>length must be larger than 3</div>" +
            "<span>";
        element.append($compile(messages)(scope));
    };

    var link = function ($compile) {
        return function (scope, element, attributes, form) {
            var name = setupDom(element, $compile, scope);
            if (name) {
                //addMessages(form, element, name, $compile, scope);
            }
            scope.$watch(watcherFor(form, name), updaterFor(element));
        }
    };

    function getGenericErrorMessages() {

        var msg = '<script type="text/ng-template" id="rain-form-error-messages">' +
            '<span ng-message="required">This field is required</span>' +
            '<span ng-message="minlength">This field is too short</span>' +
            '</script>';
        return msg;
    }

})();

