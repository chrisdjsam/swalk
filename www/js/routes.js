angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.today', {
    url: '/today',
    views: {
      'tab1': {
        templateUrl: 'templates/today.html',
        controller: 'todayCtrl'
      }
    }
  })

  .state('tabsController.trends', {
    url: '/trends',
    views: {
      'tab2': {
        templateUrl: 'templates/trends.html',
        controller: 'trendsCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('myPage', {
    url: '/profile',
    templateUrl: 'templates/myPage.html',
    controller: 'myPageCtrl'
  })

  .state('editProfile', {
    url: '/editprofile',
    templateUrl: 'templates/editProfile.html',
    controller: 'editProfileCtrl'
  })

$urlRouterProvider.otherwise('/page1/today')

  

});