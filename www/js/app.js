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
        templateUrl: "templates/menu.html",
        controller: "AppCtrl",
      })

      .state("app.redScreen", {
        url: "/redScreen",
        views: {
          menuContent: {
            templateUrl: "templates/redScreen.html",
          },
        },
      })

      .state("app.greenScreen", {
        url: "/greenScreen",
        views: {
          menuContent: {
            templateUrl: "templates/greenScreen.html",
            controller: "BrowseCtrl",
          },
        },
      })
      .state("app.playlists", {
        url: "/playlists",
        views: {
          menuContent: {
            templateUrl: "templates/playlists.html",
            controller: "PlaylistsCtrl",
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
    $urlRouterProvider.otherwise("/app/playlists");
  });
