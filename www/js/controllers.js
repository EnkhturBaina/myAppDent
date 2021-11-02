angular
  .module("starter.controllers", ["ionic"])
  .controller(
    "AppCtrl",
    function (
      $http,
      $scope,
      $ionicModal,
      $timeout,
      $firebaseArray,
      $rootScope,
      $ionicLoading
    ) {
      $rootScope.serviceType = $firebaseArray(
        firebase.database().ref().child("/serviceType")
      );
      console.log("$rootScope.serviceType", $rootScope.serviceType);
      $rootScope.ShowLoader = function () {
        $ionicLoading.show({
          showBackdrop: true,
          showDelay: 0,
          // template: '<div class="loadingio-spinner-spinner-v5m2iut1fj" > <div class="ldio-agte97219x" ><div > </div > <div > </div > <div > </div > <div > </div > <div > </div > <div > </div > <div > </div > <div > </div > <div > </div > <div > </div ></div > </div >',
          template:
            '<div class="custom-spinner"><div></div><div class="custom-dot"></div><div></div><div class="custom-dot"></div></div>',
        });
      };
    }
  )

  .controller("PlaylistsCtrl", function ($scope, $stateParams) {})
  .controller("PlaylistCtrl", function ($scope, $stateParams) {})
  .controller(
    "BrowseCtrl",
    function (
      $scope,
      $stateParams,
      $firebaseArray,
      $timeout,
      $rootScope,
      $ionicLoading,
      $ionicPlatform
    ) {
      $rootScope.datas = {};
      $scope.cass1Data = [];
      var nums = [];
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      $rootScope.datas.createdDate = date + " " + time;

      var uniqueId =
        today.getFullYear() +
        "" +
        (today.getMonth() + 1) +
        "" +
        today.getDate() +
        "" +
        today.getHours() +
        "" +
        today.getMinutes() +
        "" +
        today.getSeconds() +
        "" +
        Math.floor(Math.random() * 100 + 1);
      $scope.SaveCass1Data = function () {
        firebase
          .database()
          .ref("cass1datas/" + uniqueId)
          .set($rootScope.datas);
        $scope.getCass1Data();
      };

      $scope.calcAvailableTime = function () {
        nums = ["8", "9", "10", "11", "12", "13", "14", "15", "16"];
        console.log("$scope.cass1Data", $scope.cass1Data);
        $scope.cass1Data.map((item) => {
          console.log("item", item);
        });
        angular.forEach($scope.cass1Data, function (item) {
          console.log("item", item.servicetime);
        });
      };

      $scope.getCass1Data = function () {
        $rootScope.ShowLoader();
        $scope.cass1Data = $firebaseArray(
          firebase.database().ref().child("/cass1datas")
        );
        $scope.calcAvailableTime();
        $timeout(function () {
          $ionicLoading.hide();
        }, 2000);
      };
      $scope.getCass1Data();

      $ionicPlatform.ready(function () {
        setTimeout(function () {
          new MobileSelect({
            trigger: ".nationalNumberPicker",
            wheels: [{ data: nums }],
            position: [0, 0],
            ensureBtnText: "Болсон",
            maskOpacity: 0.5,
            cancelBtnText: "Хаах",
            transitionEnd: function (indexArr, data) {
              //scrolldood duusahad ajillah func
            },
            callback: function (indexArr, data) {
              $rootScope.datas.servicedate = date;
              $rootScope.datas.servicetime = data[0];
              console.log("A", $rootScope.datas.servicetime);
            },
          });
        }, 1000);
      });
    }
  );
