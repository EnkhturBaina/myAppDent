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
      $ionicPlatform,
      $ionicPopup
    ) {
      $scope.showAlert = function (text) {
        var alertPopup = $ionicPopup.alert({
          // title: "Don't eat that!",
          template: text,
        });
        alertPopup.then(function (res) {});
      };

      $scope.checkReqiured = function (param) {
        if (param == "service-order") {
          if ($rootScope.datas.name == null) {
            $scope.showAlert("Нэр оруулна уу");
            return false;
          } else if ($rootScope.datas.phone == null) {
            $scope.showAlert("Регистр оруулна уу");
            return false;
          } else if ($rootScope.datas.incometype == null) {
            $scope.showAlert("Утасны дугаар оруулна уу");
            return false;
          } else if ($rootScope.datas.incometype == null) {
            $scope.showAlert("Үйлчилгээ сонгоно уу");
            return false;
          } else if ($rootScope.datas.servicetime == null) {
            $scope.showAlert("Цаг сонгоно уу");
            return false;
          } else {
            return true;
          }
        }
      };

      $rootScope.datas = {};
      $rootScope.selectedTimes = [];
      $scope.cass1Data = [];
      $rootScope.nums = [];
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
        console.log("A");
        if ($scope.checkReqiured("service-order")) {
          console.log("B");
          firebase
            .database()
            .ref("cass1datas/" + uniqueId)
            .set($rootScope.datas);
          $scope.getCass1Data();
        }
      };

      $scope.calcAvailableTime = function () {
        $rootScope.nums = ["8", "9", "10", "11", "12", "13", "14", "15", "16"];
        console.log("$rootScope.selectedTimes", $rootScope.selectedTimes);
        angular.forEach($scope.cass1Data, function (item) {
          console.log("item", item.servicetime);
        });
      };

      $scope.getCass1Data = function () {
        $rootScope.ShowLoader();
        var ref = firebase.database().ref();

        ref.on(
          "value",
          function (snapshot) {
            $scope.cass1Data = snapshot.val().cass1datas;
            angular.forEach($scope.cass1Data, function (item) {
              $rootScope.selectedTimes.push(item.servicetime);
            });
          },
          function (error) {
            console.log("Error: " + error.code);
          }
        );

        $timeout(function () {
          $ionicLoading.hide();
        }, 2000);
      };
      $scope.getCass1Data();

      $timeout(function () {
        $ionicPlatform.ready(function () {
          $scope.calcAvailableTime();
          setTimeout(function () {
            new MobileSelect({
              trigger: ".nationalNumberPicker",
              wheels: [{ data: $rootScope.nums }],
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
              onShow: function () {
                $scope.calcAvailableTime();
              },
            });
          }, 1000);
        });
      }, 2000);
      $rootScope.$on("$ionicView.enter", function () {});
      $rootScope.$on("$ionicView.loaded", function () {});
    }
  );
