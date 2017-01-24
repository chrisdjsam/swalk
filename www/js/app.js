// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'chart.js'])

.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, $cordovaSQLite) {
  var picpath = localStorage.getItem("picturepath");
  $rootScope.imgURI = (picpath != undefined) ? picpath : "" ;

  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

     $rootScope.toggleLeftSideMenu = function() {
     $ionicSideMenuDelegate.toggleLeft();
   };

   db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
   var query = "CREATE TABLE IF NOT EXISTS `swalk_users` (`email` Text, name TEXT, identity TEXT) ";
        $cordovaSQLite.execute(db, query).then(function(res) {
          console.log("user insertId: " + JSON.stringify(res));
        }, function (err) {
          console.error(err);
        });

  });
})