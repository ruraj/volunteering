/**
 * Created by sagun on 4/10/15.
 */

angular.module('qmsApp.sharedElements', [])

    .directive('footer', function () {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: "shared/footer/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {

        }]
      }
    });
