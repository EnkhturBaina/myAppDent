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
      $rootScope.ShowLoader = function () {
        $ionicLoading.show({
          showBackdrop: true,
          showDelay: 0,
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
          if ($rootScope.datas.name == null || $rootScope.datas.name == "") {
            $scope.showAlert("Нэр оруулна уу");
            return false;
          } else if (
            $rootScope.datas.register == null ||
            $rootScope.datas.register == ""
          ) {
            $scope.showAlert("Регистр оруулна уу");
            return false;
          } else if (
            $rootScope.datas.phone == null ||
            $rootScope.datas.phone == ""
          ) {
            $scope.showAlert("Утасны дугаар оруулна уу");
            return false;
          } else if (
            $rootScope.datas.incometype == null ||
            $rootScope.datas.incometype == ""
          ) {
            $scope.showAlert("Үйлчилгээ сонгоно уу");
            return false;
          } else if (
            $rootScope.datas.servicetime == null ||
            $rootScope.datas.servicetime == ""
          ) {
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
        if ($scope.checkReqiured("service-order")) {
          firebase
            .database()
            .ref("cass1datas/" + uniqueId)
            .set($rootScope.datas);
          $scope.getCass1Data();
          $rootScope.datas = {};
        }
      };
      $scope.ppSourceSelectOn = function (path) {
        console.log("$scope.selectedTimes", $scope.selectedTimes);
        if ($scope.selectedTimes == "") {
          $scope.notNullTimes = false;
          $timeout(function () {
            $scope.ppSourceSelectOff();
          }, 1500);
        } else {
          $scope.notNullTimes = true;
        }
        $scope.selectedImagePath = path;
        document.getElementById("overlayProfilePicute").style.display = "block";
        $rootScope.nums = ["8", "9", "10", "11", "12", "13", "14", "15", "16"];
        angular.forEach($scope.selectedTimes, function (item) {
          for (var i = 0; i < $rootScope.nums.length; i++) {
            if ($rootScope.nums[i] === item) {
              $rootScope.nums.splice(i, 1);
              $scope.notNullTimes = true;
            }
          }
        });
      };
      $scope.ppSourceSelectOff = function () {
        document.getElementById("overlayProfilePicute").style.display = "none";
      };
      $scope.selectTime = function (time) {
        console.log("time", time);
        $rootScope.datas.servicedate = date;
        $rootScope.datas.servicetime = time;
      };

      $scope.getCass1Data = function () {
        $rootScope.ShowLoader();
        var ref = firebase.database().ref();

        ref.on(
          "value",
          function (snapshot) {
            $scope.cass1Data = snapshot.val().cass1datas;
            angular.forEach($scope.cass1Data, function (item) {
              if (date == item.servicedate) {
                $rootScope.selectedTimes.push(item.servicetime);
              }
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

      $rootScope.$on("$ionicView.enter", function () {});
      $rootScope.$on("$ionicView.loaded", function () {});
    }
  );
