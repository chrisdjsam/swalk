angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('userService', ['$rootScope', function($rootScope){

	var service = {

        model: {
            picturepath: ''
        },

        SavePicPath: function (picpath) {
            localStorage.picuturepath = angular.toJson(picpath);
        },

        RestorePicPath: function () {
            service.model.picuturepath = angular.fromJson(localStorage.picuturepath);
        }
    }

    $rootScope.$on("SavePicPath", service.SavePicPath);
    $rootScope.$on("RestorePicPath", service.RestorePicPath);

    return service;

}]);

