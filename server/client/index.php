<!doctype html>
<html lang="en" ng-app="MainApp" ng-strict-di class="ng-scope">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Create and join volunteering opportunities">
    <meta name="viewport" content="initial-scale=1">
    <title>Volunteering</title>

    <!-- Add to homescreen -->
    <link rel="manifest" href="manifest.json">

    <!-- Fallback to homescreen for Chrome <39 on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Volunteering">
    <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Volunteering">
    <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#3372DF">

    <meta name="theme-color" content="#3372DF">

    <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
    -->

    <!-- Page styles -->
    <link rel="stylesheet" href="styles/main.css">

    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css">
    <link rel="stylesheet" href="bower_components/mdi/css/materialdesignicons.min.css">

  </head>
  <body ng-controller="MainController">
      <md-content>
        <md-toolbar class="blue white-text">
            <div class="md-toolbar-tools">
                <h2>
                  <span>Let's Volunteer</span>
                </h2>
                <span flex></span>
                <div ng-if="loggedIn()" layout-align="center center" layout="row">
                  <md-button class="md-icon-button" ui-sref="post({id:'new'})"><i class="mdi mdi-plus"></i><span hide-sm>Request Volunteers</span></md-button>
                  <md-button class="md-icon-button" ng-click="search.string=getUser().email"><i class="mdi mdi-view-list"></i><span hide-sm>My Requests</span></md-button>
                  <md-button class="md-icon-button" ng-click="logout()" ng-if="loggedIn()"><i class="mdi mdi-logout"></i>
                    <div layout="column" hide-sm>
                      <small>{{getUser().firstname}}</small>
                      <span>Logout</span>
                    </div>
                  </md-button>
                </div>
                <div ng-if="!loggedIn()" layout-align="center center" layout="row">
                  <md-button class="md-icon-button" ui-sref="login"><i class="mdi mdi-login"></i><span hide-sm>Login</span></md-button>
                  <md-button class="md-icon-button" ui-sref="register"><i class="mdi mdi-account-plus"></i><span hide-sm>Register</span></md-button>
                </div>
              </div>
        </md-toolbar>
      </md-content>

      <md-content layout-padding>
        <md-input-container>
          <label>Search For</label>
          <input type="text" ng-model="search.string"/>
        </md-input-container>
        <div id="posts-container" layout="row" layout-wrap>
          <post-detail ng-repeat="post in posts() | filter:search.string" post=post></post-detail>
        </div>
      </md-content>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-XXXXX-X', 'auto');
      ga('send', 'pageview');
    </script>
    <!-- Built with love using Web Starter Kit -->
  </body>

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-touch/angular-touch.min.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="bower_components/angular-resource/angular-resource.min.js"></script>
    <script src="bower_components/angular-messages/angular-messages.min.js"></script>
    <script src="bower_components/angular-material/angular-material.js"></script>
    <script src="bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="bower_components/angular-aria/angular-aria.min.js"></script>

    <script src="scripts/angular-readmore.js"></script>
    <script src="scripts/main.js"></script>
    <script src="shared/filters/filters.js"></script>
    <script src="shared/dn_form/dn-form.js"></script>
    <script src="shared/form_dialog/form-dialog.js"></script>

</html>
