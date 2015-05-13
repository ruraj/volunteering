'use strict';

angular
    .module('qmsApp.ngFootable', [])
    .directive('footable', function() {
        var events = {
            beforeFiltering: 'footable_filtering'
        };
        var extractSpecOpts = function(opts, attrs) {
            var extracted = {},
                k;
            for (k in opts) {
                if (k !== 'filter' && (!angular.isUndefined(events[k]))) {
                    if(!angular.isFunction(scope.$eval(attrs[k]))) {
                        extracted[k] = attrs[k];
                    }
                }
            }
            return extracted;
        };

        var bindEventHandler = function(tableObj, scope, attrs) {
            var k;
            for (k in attrs) {
                if (k !== 'filter' && (!angular.isUndefined(events[k]))) {
                    var targetEventName = events[k];
                    if(angular.isFunction(scope.$eval(attrs[k]))) {
                        tableObj.bind(targetEventName, scope.$eval(attrs[k]));
                    }
                }
            }
        };

        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                var tableOpts = {
                    'event-filtering': null
                };

                angular.extend(
                    tableOpts,
                    footable.options
                );

                angular.extend(
                    tableOpts,
                    extractSpecOpts(tableOpts, attrs)
                );

                var tableObj = element.footable(tableOpts);

                bindEventHandler(tableObj, scope, attrs);

            }
        };
    })

    .directive('toolbarHandler', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if (attrs.toolbarHandler) {
                    //scope.handler = scope.$evalAsync(attrs.toolbarHandler);
                }
            },
            controller: function($scope) {
                this.handle = function() {
                    return $scope.handler;
                }
            }
        }
    })

    .directive('hasToolbar', function($compile) {
        var selectMe = function() {
            console.log(":D");
        };

        return {
            restrict: 'A',
            require: 'toolbarHandler',
            link: function(scope, element, attrs, toolbarHandler) {
                var opts = scope.$eval(attrs.hasToolbar);
                var a = $(element).toolbar(opts);
                console.log(a);
                //a.each(function() {
                //    console.log(this);
                //});
                //$compile(tb)(scope);
            }
        }
    });