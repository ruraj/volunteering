'use strict';

angular.module("MainApp", [
  'formDialog',
  'dnForm',
  'ngMaterial',
  'ui.router',
  'readMore',
  'ngTouch',
  'ngMessages'])

  .factory("mainService", ['$http', '$mdToast', MainService])

  .config(['$stateProvider', '$urlRouterProvider', MainConfig])

  .controller("MainController", ['$scope', '$rootScope', MainController])

  .directive("postDetail", function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "post.html",
      controller: ['$scope', '$timeout', '$mdBottomSheet', PostController],
      scope: {
        post: "="
      }
    }
  });

function MainService($http, $mdToast) {
  function notify(msg) {
    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position({top: true})
        .hideDelay(3000)
    )
  }
  return {
    getPost: function(id) {

    },
    submit: function(data) {
      $http.post("/put_post", {
        data: data
      }).success(function (result, status, headers, config) {
        notify("Success");
      }).error(function (errorResult, status, headers, config) {
        notify("Error");
      })
    },
    postFormSource: "postForm",
    loginForm: {
      "name": "SiteForm",
      "fields": [
        [
          [
            {
              "type": "email",
              "name": "email",
              "label": "Email",
              "required": true
            }
          ]
        ],
        [
          [
            {
              "type": "password",
              "name": "password",
              "label": "Password",
              "required": true
            }
          ]
        ]
      ]
    }

  }
}

function MainConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state("home", {
      url: "/home"
    })
    .state("login", {
      url: '/login',
      onEnter: ['formDialog', 'mainService', function (formDialog, mainService) {
        formDialog({
          title: "Login",
          item: null,
          form: mainService.loginForm
        });
      }]
    })
    .state("post", {
      url: '/post:id',
      onEnter: ['formDialog', 'mainService', '$stateParams', function (formDialog, mainService, $stateParams) {
        formDialog({
          title: "New Post",
          item: mainService.getPost($stateParams.id),
          formSource: mainService.postFormSource,
          onSubmit: mainService.submit
        })
      }]
    })
}

function MainController($scope, $rootScope) {

  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
  });

  $scope.loggedIn = function () {
    return false;
  };

  $scope.posts = [
    {
      "title": "Volunteer at Khokana",
      "description": "Khokana needs a lot of support from our side. Please come help" +
      "us do this bery important job. Please call us!",
      "createdAt": "May 2 13:59:32 2015",
      "deadline": "May 5 00:00:00 2015",
      "contact": "9841251091",
      "categories": ["rescue", "distribution", "awareness", "health"],
      "user": {
        "firstname": "Kaushik",
        "lastname": "Kasaju",
        "contact": "9818242501",
        "email": "kasaju_97@gmail.com"
      },
      "locations": [
        {
          "address": "Putalisadak",
          "city": "Kathmandu",
          "lat": "N/A",
          "long": "N/A",
          "contact": {
            "firstname": "Kaushik",
            "lastname": "Kasaju",
            "contact": "9818242501",
            "email": "kasaju_97@gmail.com"
          }
        },
        {
          "address": "Sindhupalchowk",
          "city": "Sindhupalchowk",
          "lat": "N/A",
          "long": "N/A",
          "contact": {
            "firstname": "Raju",
            "lastname": "Manandhar",
            "contact": "9841263578",
            "email": "kasaju_97@gmail.com"
          }
        }
      ]
    },
    {
      "title": "Sindhuli in Danger!!",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum vehicula " +
      "tortor, vitae ornare nunc semper eu. Vivamus varius, eros vel tristique accumsan, " +
      "libero nulla cursus ante, eu eleifend risus orci scelerisque nibh. Curabitur feugiat" +
      ", augue ut commodo bibendum, nisi leo porttitor diam, tincidunt auctor tellus ante sit amet " +
      "bh. Duis velit libero, aliquam at felis eu, pellentesque mollis mi. Nam a est orci. Ut bibendum" +
      " sagittis semper. Cras eget arcu non augue mollis aliquam. Ut ut gravida" +
      "auctor. Aliquam eget pretium velit. Morbi urna justo, pulvinar id lobortis in, aliquet placerat orci.",
      "createdAt": "May 1 7:02:55 2015",
      "deadline": "May 5 00:00:00 2015",
      "contact": "9818242501",
      "categories": ["rescue", "distribution", "awareness", "health"],
      "user": {
        "firstname": "Ruraj",
        "lastname": "Joshi",
        "contact": "9841251091",
        "email": "rurajjoshi@gmail.com"
      },
      "locations": [
        {
          "address": "Putalisadak",
          "city": "Kathmandu",
          "lat": "N/A",
          "long": "N/A",
          "contact": {
            "firstname": "Kaushik",
            "lastname": "Kasaju",
            "contact": "9818242501",
            "email": "kasaju_97@gmail.com"
          }
        },
        {
          "address": "Sindhulipalchowk",
          "city": "Sindhulipalchowk",
          "lat": "N/A",
          "long": "N/A",
          "contact": {
            "firstname": "Raju",
            "lastname": "Manandhar",
            "contact": "9841263578",
            "email": "kasaju_97@gmail.com"
          }
        }
      ]
    }
  ];
}

function PostController($scope, $timeout, $mdBottomSheet) {

  $scope.showDetails = function ($event) {
    $mdBottomSheet.show({
      templateUrl: 'details.html',
      controller: ['$scope', 'post', DetailsController],
      targetEvent: $event,
      parent: $scope.post,
      locals: {
        post: $scope.post
      }
    });
    $event.preventDefault();
    $event.stopPropagation();
  }
}

function DetailsController($scope, post) {
  $scope.post = post;

}
