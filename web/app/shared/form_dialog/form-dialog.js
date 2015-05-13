angular.module("formDialog", [])

    .factory('formDialog', ['$rootScope', '$state', '$mdDialog', '$http', function ($rootScope, $state, $mdDialog, $http) {

        var mOptions = {
            title: "Edit",
            template: "shared/form_dialog/default_template.html",
            returnOnDone: true
        };

        return function (options) {
            var dOptions = angular.extend({}, mOptions, options);

            var title = dOptions.title;
            var item = dOptions.item;
            var form = dOptions.form;
            var formSource = dOptions.formSource;
            var onSubmit = dOptions.onSubmit;
            var onCancel = dOptions.onCancel;
            var template = dOptions.template;
            var returnOnDone = dOptions.returnOnDone;

            if (formSource) {
                $http.get(formSource).then(
                    function (response) {
                        form = response.data;
                        showDialog();
                    },
                    function (errResponse) {

                    });
            } else {
              showDialog();
            }

            function showDialog() {
                $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'form', 'item', 'title', DialogController],
                    templateUrl: template,
                    locals: {
                        title: title,
                        item: item,
                        form: form
                    }
                })
                    .then(function (message) {
                    }, function () {
                      if (returnOnDone) {
                        $state.go($rootScope.previousState);
                      }
                    });

                function DialogController($scope, $mdDialog, form, item, title) {
                    $scope.title = title;
                    $scope.configForm = form;
                    $scope.configForm.data = item;

                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        if (onCancel) {
                            onCancel();
                        }
                        $mdDialog.cancel();
                    };
                    $scope.submitForm = function () {
                        if (trySubmit()) {
                            $mdDialog.hide();
                        } else {
                            showError();
                        }
                    };

                    function trySubmit() {
                        if (onSubmit) {
                            return onSubmit($scope.configForm.data);
                        } else {
                            return true;
                        }
                    }

                    function showError() {

                    }
                }
            }
        };
    }]);
