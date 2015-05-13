/**
 * Created by sagun on 4/10/15.
 */

angular.module('qmsApp.sideNav', [])

    .directive('sideNav', function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: "shared/sidenav/sidenav.html",
        controller: ['$scope', function ($scope) {
          $scope.nav = {};
          $scope.nav.selected = "";
          $scope.listItems = [
            {
              type: "toggle",
              title: "Operations",
              icon: "mdi mdi-briefcase",
              active: "active",
              pages: [
                {
                  "title": "Sites",
                  "description": "Sites configured for this organization",
                  "icon": "mdi mdi-city",
                  "url": "/sites"
                },
                {
                  "title": "Queues",
                  "description": "Queues assigned here",
                  "icon": "mdi mdi-account-multiple",
                  "url": "/queues"
                },
                {
                  "title": "Services",
                  "description": "Services assigned here",
                  "icon": "mdi mdi-cloud-outline",
                  "url": "/services"
                },
                {
                  "title": "Users",
                  "description": "Users assigned here",
                  "icon": "mdi mdi-account",
                  "url": "/users"
                },
                {
                  "title": "Tellers",
                  "description": "Tellers assigned here",
                  "icon": "mdi mdi-account",
                  "url": "/tellers"
                }
              ]
            },
            {
              type: "toggle",
              title: "Devices",
              icon: "mdi mdi-briefcase",
              active: "active",
              pages: [
                {
                  "title": "Counters",
                  "description": "Counters assigned here",
                  "icon": "mdi mdi-monitor",
                  "url": "/counters"
                },
                {
                  "title": "Displays",
                  "description": "Displays",
                  "icon": "mdi mdi-monitor",
                  "url": "/displays"
                },
                {
                  "title": "Dispensers",
                  "description": "Dispensers",
                  "icon": "mdi mdi-monitor",
                  "url": "/dispensers"
                }
              ]
            },
            {
              type: "toggle",
              title: "Advanced",
              active: "active",
              pages: [
                {
                  "title": "Channels",
                  "icon": "mdi mdi-wifi",
                  "url": "/channels"
                },
                {
                  "title": "Plugins",
                  "icon": "mdi mdi-source-pull",
                  "url": "/plugins"
                },
                {
                  "title": "Organization Settings",
                  "icon": "mdi mdi-bank",
                  "url": "/organization/settings"
                },
                {
                  "title": "Monitoring",
                  "icon": "mdi mdi-monitor-multiple",
                  "url": "/monitor"
                },
                {
                  "title": "RS485 Test-tool",
                  "icon": "mdi mdi-pound",
                  "url": "/rs485/tool"
                }
              ]
            }
          ];
        }]
      }
    })

    .directive('sideNavItem', function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: "shared/sidenav/sidenavitem.html",
        link: function(scope, elem, attrs) {
          scope.item = scope.$eval(attrs.item);
        },
        controller: ['$scope', '$location', function($scope, $location) {
          $scope.showThis = function(item) {
            $scope.nav.selected = $scope.item.title;
            $location.url($scope.item.url)
          };

          $scope.isSelected = function(item) {
            return $scope.nav.selected === $scope.item.title;
          };
        }]
      }
    })

    .directive('sideNavToggle', function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: "shared/sidenav/sidenavtoggle.html",
        link: function(scope, elem, attrs) {
          scope.item = scope.$eval(attrs.item);
          $(elem).collapsible();
        },
        controller: ['$scope', '$location', function($scope, $location) {
          $scope.isSelected = function(item) {
            return $scope.nav.selected === item.title;
          };
        }]
      }
    });