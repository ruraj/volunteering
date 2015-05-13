/**
 * Created by sagun on 4/10/15.
 */

angular.module('qmsApp.toolbar', [])

    .directive('toolbar', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: "shared/toolbar/toolbar.html",
        controller: ['$scope', '$rootScope', 'siteService', function ($scope, $rootScope, siteService) {
            $scope.location = $rootScope.currentState;
            $scope.sites = siteService.sites;
        }],
        controllerAs: "toolbarCtrl"
      }
    });