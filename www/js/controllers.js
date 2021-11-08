angular
  .module("starter.controllers", ["ionic"])
  .controller(
    "AppCtrl",
    function (
      $http,
      $scope,
      $ionicHistory,
      $timeout,
      $firebaseArray,
      $rootScope,
      $ionicLoading
    ) {
      var ref = firebase.database().ref();

      ref.on(
        "value",
        function (snapshot) {
          $rootScope.serviceType = snapshot.val().serviceType;

          localStorage.setItem(
            "serviceTypes",
            JSON.stringify($rootScope.serviceType)
          );
        },
        function (error) {
          console.log("Error: " + error.code);
        }
      );
      $rootScope.ShowLoader = function () {
        $ionicLoading.show({
          showBackdrop: true,
          showDelay: 0,
          template:
            '<div class="custom-spinner"><div></div><div class="custom-dot"></div><div></div><div class="custom-dot"></div></div>',
        });
      };
      $scope.logOut = function () {
        $rootScope.loggedUser = "";
        $rootScope.isLogin = false;
        $rootScope.user = {
          username: "",
          password: "",
        };
        $ionicHistory.clearCache();
      };
    }
  )
  .controller("aboutCtrl", function ($scope, $rootScope) {
    console.log("aboutCtrl");
  })
  .controller("equCtrl", function ($scope, $rootScope) {
    console.log("equCtrl");
  })

  .controller("adminCtrl", function ($scope, $rootScope) {
    var today = new Date();
    $rootScope.todayDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var data1 = JSON.parse(localStorage.getItem("timeDatas"));
    var data2 = JSON.parse(localStorage.getItem("serviceTypes"));
    $rootScope.emchDatas = data1;
    $rootScope.serviceType = data2;
  })
  .controller("redScreenCtrl", function ($scope, $rootScope) {
    var today = new Date();
    $rootScope.todayDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var data1 = JSON.parse(localStorage.getItem("timeDatas"));
    var data2 = JSON.parse(localStorage.getItem("serviceTypes"));
    $rootScope.emchDatas = data1;
    $rootScope.serviceType = data2;
  })
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
      $scope.checkReqiured = function (param) {
        if (param == "service-order") {
          if ($rootScope.datas.name == null || $rootScope.datas.name == "") {
            $rootScope.showAlert("Нэр оруулна уу");
            return false;
          } else if (
            $rootScope.datas.register == null ||
            $rootScope.datas.register == ""
          ) {
            $rootScope.showAlert("Регистр оруулна уу");
            return false;
          } else if (
            $rootScope.datas.phone == null ||
            $rootScope.datas.phone == ""
          ) {
            $rootScope.showAlert("Утасны дугаар оруулна уу");
            return false;
          } else if (
            $rootScope.datas.incometype == null ||
            $rootScope.datas.incometype == ""
          ) {
            $rootScope.showAlert("Үйлчилгээ сонгоно уу");
            return false;
          } else if (
            $rootScope.datas.servicetime == null ||
            $rootScope.datas.servicetime == ""
          ) {
            $rootScope.showAlert("Цаг сонгоно уу");
            return false;
          } else {
            return true;
          }
        }
      };

      $rootScope.datas = {};
      $rootScope.selectedTimes = [];
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

        if ($scope.selectedTimes == "") {
          $rootScope.nums = [
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
          ];
          $scope.notNullTimes = true;
        } else {
          angular.forEach($scope.selectedTimes, function (item) {
            for (var i = 0; i < $rootScope.nums.length; i++) {
              if ($rootScope.nums[i] === item) {
                $rootScope.nums.splice(i, 1);
                $scope.notNullTimes = true;
              }
            }
          });
        }
      };
      $scope.ppSourceSelectOff = function () {
        document.getElementById("overlayProfilePicute").style.display = "none";
      };
      $scope.selectTime = function (time) {
        $rootScope.datas.servicedate = date;
        $rootScope.datas.servicetime = time;
      };

      $scope.getCass1Data = function () {
        $rootScope.ShowLoader();
        angular.forEach($rootScope.cass1Data, function (item) {
          if (date == item.servicedate) {
            $rootScope.selectedTimes.push(item.servicetime);
          }
        });

        $timeout(function () {
          $ionicLoading.hide();
        }, 2000);
      };
      $scope.getCass1Data();

      $rootScope.$on("$ionicView.enter", function () {
        var data1 = JSON.parse(localStorage.getItem("timeDatas"));
        $rootScope.cass1Data = data1;
      });
      $rootScope.$on("$ionicView.loaded", function () {
        $scope.getCass1Data();
      });
    }
  )
  .controller(
    "loginCtrl",
    function (
      $scope,
      $state,
      $rootScope,
      $ionicPopup,
      $timeout,
      $ionicLoading
    ) {
      $rootScope.ShowLoader = function () {
        $ionicLoading.show({
          showBackdrop: true,
          showDelay: 0,
          template:
            '<div class="custom-spinner"><div></div><div class="custom-dot"></div><div></div><div class="custom-dot"></div></div>',
        });
      };
      $rootScope.showAlert = function (text) {
        var alertPopup = $ionicPopup.alert({
          // title: "Don't eat that!",
          template: text,
        });
        alertPopup.then(function (res) {});
      };
      $rootScope.user = {
        username: "",
        password: "",
      };
      $rootScope.$on("$ionicView.enter", function () {
        $rootScope.ShowLoader();
        $rootScope.cass1Data = [];
        $rootScope.loggedUser = "";
        $rootScope.isLogin = false;
        $scope.Users = {};
        $timeout(function () {
          $ionicLoading.hide();
        }, 2000);

        var cass1Data = firebase.database().ref();

        cass1Data.on(
          "value",
          function (snapshot) {
            $rootScope.cass1Data = snapshot.val().cass1datas;
            localStorage.setItem(
              "timeDatas",
              JSON.stringify($rootScope.cass1Data)
            );
          },
          function (error) {
            console.log("Error: " + error.code);
          }
        );

        var ref = firebase.database().ref();

        ref.on(
          "value",
          function (snapshot) {
            $scope.Users = snapshot.val().Users;
          },
          function (error) {
            console.log("Error: " + error.code);
          }
        );
      });
      $scope.$on("$ionicView.beforeEnter", function () {});
      $scope.checkReqiuredLogin = function (param) {
        if (param == "login") {
          if ($rootScope.user.username == "") {
            $rootScope.showAlert("И мэйл оруулна уу");
            return false;
          } else if ($rootScope.user.password == "") {
            $rootScope.showAlert("нууц үг оруулна уу");
            return false;
          } else {
            return true;
          }
        }
      };
      $scope.checkUser = function () {
        if ($scope.checkReqiuredLogin("login")) {
          angular.forEach($scope.Users, function (item) {
            if (
              item.username === $rootScope.user.username &&
              item.password === $rootScope.user.password
            ) {
              $rootScope.loggedUser = item.username;
              $rootScope.isLogin = true;
            } else {
            }
          });
          $timeout(function () {
            if ($rootScope.isLogin) {
              if ($rootScope.loggedUser == "admin") {
                $state.go("app.admin");
              } else if ($rootScope.loggedUser == "emch") {
                $state.go("app.redScreen");
              } else if ($rootScope.loggedUser == "user") {
                $state.go("app.greenScreen");
              }
            } else {
              $rootScope.showAlert("И мэйл эсвэл нууц үг буруу байна");
            }
          }, 500);
        }
      };
    }
  );
