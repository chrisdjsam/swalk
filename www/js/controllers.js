angular.module('app.controllers', [])
  
.controller('todayCtrl', function($scope, $http, dateFilter, $rootScope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];
  $scope.showphoto = true;

  $scope.getuserdata = function(){
    var query = "select email from swalk_users ";
    $cordovaSQLite.execute(db, query).then(function(res) {
        console.log("user data: " + JSON.stringify(res));
        return res;
      }, function (err) {
        console.error(err);
      });
  };

  $scope.user = localStorage.getItem("userdata")!==null ? angular.fromJson(localStorage.getItem("userdata")) : null;

  if($scope.user == null)
  {
     $scope.user = $scope.getuserdata();
  }
  if($scope.user != null)
  {
    var email = $scope.user.email;
    var getinfo = 'info.php?email='+ email;

    $http({
      method  : 'GET',
      url     : getinfo
    })
    .success(function(data) {
      if (data.errors) {
              // Showing errors.

      } else {
        $scope.user = data.info[0];
        if($scope.user){
          var date = new Date($scope.user.dob);
          $scope.user.dob = new Date(date.setDate(date.getDate() + 1));
        }
        localStorage.setItem("userdata",angular.toJson($scope.user));  

      }
    });
  }

})
   
.controller('trendsCtrl', function($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

})
   
.controller('settingsCtrl', function($scope) {

})
         
.controller('loginCtrl', function($scope) {

})
   
.controller('myPageCtrl', function($scope) {

})
   
.controller('editProfileCtrl', function($scope, $cordovaCamera, $rootScope, $ionicSideMenuDelegate, $http, dateFilter,$cordovaGeolocation, $ionicPopup, $timeout, $cordovaSQLite) {
  
   $scope.user = {};

  // An alert dialog
 $scope.showAlert = function(strTitle, strText) {
   var alertPopup = $ionicPopup.alert({
     title: strTitle,
     template: strText
   });
 };

 $scope.insertuser = function(dataObject) {
    var query = "INSERT INTO `swalk_users` (name, `email`, `identity`) VALUES (?,?,?)";
        $cordovaSQLite.execute(db, query, [dataObject.name, dataObject.email, dataObject.identity]).then(function(res) {
          console.log("user insertId: " + res.insertId);
          return res;
        }, function (err) {
          console.error(err);
    });
 };
 $scope.submitprofile = function(){
        var link = 'signup.php';
        if($scope.user.dob)
          $scope.user.dob = dateFilter($scope.user.dob , 'yyyy-MM');
        $scope.user.lat = lat;
        $scope.user.long = long;
        $http({
          method  : 'POST',
          url     : link,
          data    : $scope.user, //forms user object
          headers : {'Content-Type': 'application/form-data'} 
         })
          .success(function(data) {
            if (data.error) {
              // Showing errors.
               $scope.showAlert("Error", data.error);
             
            } else {
              $scope.message = data.info;
              localStorage.setItem("userdata",angular.toJson($scope.user));
              $scope.insertuser($scope.user);
              $scope.showAlert("Success", data.info);
            }
            
          });
          //var date = new Date($scope.user.dob);
          //$scope.user.dob = new Date(date.setDate(date.getDate() + 1));
    };
  $scope.cancel = function(){
        $scope.user = angular.fromJson(localStorage.getItem("userdata"));
    };

  var posOptions = {timeout: 1000, enableHighAccuracy: false};
  var lat  = "1.0";
  var long = "1.0";
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat  = position.coords.latitude
      long = position.coords.longitude
    }, function(err) {
      // error
    });

  //localStorage.setItem("picturepath","img/adam.jpg");
  var checkUser = angular.fromJson(localStorage.getItem("userdata"));
  if($scope.user == null)
  {
     $scope.user = writeLocal.getuserdata();
  }

  if(checkUser !== undefined)
    $scope.user = angular.fromJson(localStorage.getItem("userdata"));
  else{
      //Local DB
      $scope.user = writeLocal.getuserdata();
  }

  if($scope.user != null)
  {
        var email = $scope.user.email;
        var getinfo = 'info.php?email='+ email;
 
        $http({
          method  : 'GET',
          url     : getinfo
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
             
            } else {
              $scope.user = data.info[0];
              if($scope.user){
                var date = new Date($scope.user.dob);
                //date.getDate() + 1;
                $scope.user.dob = new Date(date.setDate(date.getDate() + 1));
              }
              localStorage.setItem("userdata",angular.toJson($scope.user));  
        
            }
          });

        /*$http.get(getinfo).then(function (res){
            if(res.info){
              $scope.user = angular.fromJson(res.info);
              localStorage.setItem(angular.toJson(res.info));
            }
              
        });*/
  }
  
   $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
                      // An error occured. Show a message to the user
                    });
  }

  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
      localStorage.setItem("picturepath","data:image/jpeg;base64," + imageData);
    }, function (err) {
                      // An error occured. Show a message to the user
                    });
  }

})

.controller('NotificationController', function($scope, $cordovaLocalNotification, $ionicPlatform) {

	$ionicPlatform.ready(function () {
         
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Warning',
            text: 'This is warning!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };
         
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };
 
        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
        };      
         
        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };  
 
        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };      
         
    });

})
 