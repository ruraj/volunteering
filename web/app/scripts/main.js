'use strict';

angular.module("MainApp", [
  'formDialog',
  'dnForm',
  'ngMaterial',
  'ui.router',
  'readMore',
  'ngTouch',
  'ngMessages'])

  .factory("mainService", ['$http', '$mdToast', '$interval', '$state', MainService])

  .config(['$stateProvider', '$urlRouterProvider', MainConfig])

  .controller("MainController", ['$scope', '$rootScope', 'mainService', MainController])

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

function MainService($http, $mdToast, $interval, $state) {
  var posts = [];
  var user = {};

  $interval(getter, 10000);
  notify("Getting data");
  getter();

  return {
    getPost: function (id) {

    },
    getPosts: function() {
      return posts;
    },
    loggedIn: function() {
      return user.email;
    },
    user: function() {
      return user;
    },
    submitLogin: function (data) {
      // Do http calls
      $http.post("/Volunteering/web/app/login", {
        data: data
      }).success(function (result, status) {
        user = result;
        notify("Logged in");
      }).error(function (result, status) {
        notify("Could not login: "+result);
      });
      return true;
    },
    logout: function () {
      user = {};
      // Some local data storage will need to be modified and cookies
    },
    submitRegistration: function (data) {

    },
    submitPost: function (data) {
      console.log(data);
      notify("Saving");
      $http.post("/put_post", {
        data: data
      }).success(function (result, status, headers, config) {
        notify("Success");
        return true;
      }).error(function (errorResult, status, headers, config) {
        notify("Error");
        return false;
      })
    },
    postFormSource: "postForm",
    loginForm: {
      "name": "SiteForm",
      "fields": [
        [
          [{"type": "email", "name": "email","label": "Email", "required": true}]
        ],
        [
          [{"type": "password", "name": "password", "label": "Password", "required": true}]
        ]
      ]
    },
    registrationForm: {
      "name": "NewUser",
      "fields": [
        [
          [{"type": "text", "name": "firstname", "label": "First Name", "required": true}],
          [{"type": "text", "name": "lastname", "label": "Last Name", "required": true}],
          [{"type": "number", "name": "contact", "label": "Contact Number", "required": true}]
        ],
        [
          [{"type": "email", "name": "email", "label": "Email", "required": true}]
        ],
        [
          [{"type": "email", "name": "confirm-email", "label": "Confirm Email", "required": true}]
        ]
      ]
    }

  };

  function getter() {
    $http.get("/Volunteering/web/app/get_posts")
      .success(function (result, status, headers, config) {
        posts = result;
      }).error(function (result, status, headers, config) {
        notify("Error getting posts ("+status+")");
      });
  }

  function notify(msg) {
    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position("bottom left right")
        .hideDelay(3000)
    );
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
          form: mainService.loginForm,
          onSubmit: mainService.submitLogin
        });
      }]
    })
    .state("register", {
      url: '/register',
      onEnter: ['formDialog', 'mainService', function (formDialog, mainService) {
        formDialog({
          title: "Register",
          item: null,
          form: mainService.registrationForm,
          onSubmit: mainService.submitRegistration
        })
      }]
    })
    .state("post", {
      url: '/post:id',
      onEnter: ['formDialog', 'mainService', '$stateParams', function (formDialog, mainService, $stateParams) {
        formDialog({
          title: "New Post",
          item: mainService.getPost($stateParams.id),
          formSource: mainService.postFormSource,
          onSubmit: mainService.submitPost
        })
      }]
    })
}

function MainController($scope, $rootScope, mainService) {

  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
  });

  $scope.loggedIn = function () {
    return mainService.loggedIn();
  };

  $scope.getUser = function () {
    return mainService.user();
  };

  $scope.logout = function () {
    mainService.logout();
  };

  $scope.posts = mainService.getPosts;
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
