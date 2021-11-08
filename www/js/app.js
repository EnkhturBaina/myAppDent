angular
  .module("starter", ["ionic", "starter.controllers", "firebase"])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("app", {
        url: "/app",
        abstract: true,
        cache: false,
        templateUrl: "templates/menu.html",
        controller: "AppCtrl",
      })

      .state("login", {
        url: "/login",
        cache: false,
        templateUrl: "templates/login.html",
        controller: "loginCtrl",
      })

      .state("app.about", {
        url: "/about",
        cache: false,
        views: {
          menuContent: {
            templateUrl: "templates/about.html",
            controller: "aboutCtrl",
          },
        },
      })

      .state("app.equ", {
        url: "/equ",
        cache: false,
        views: {
          menuContent: {
            templateUrl: "templates/equ.html",
            controller: "equCtrl",
          },
        },
      })

      .state("app.redScreen", {
        url: "/redScreen",
        cache: false,
        views: {
          menuContent: {
            templateUrl: "templates/redScreen.html",
            controller: "redScreenCtrl",
          },
        },
      })

      .state("app.greenScreen", {
        url: "/greenScreen",
        cache: false,
        views: {
          menuContent: {
            templateUrl: "templates/greenScreen.html",
            controller: "BrowseCtrl",
          },
        },
      })
      .state("app.admin", {
        url: "/admin",
        views: {
          menuContent: {
            templateUrl: "templates/playlists.html",
            controller: "adminCtrl",
          },
        },
      })

      .state("app.single", {
        url: "/playlists/:playlistId",
        views: {
          menuContent: {
            templateUrl: "templates/playlist.html",
            controller: "PlaylistCtrl",
          },
        },
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/login");
  });
