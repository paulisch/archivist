(function (angular) {
  'use strict';
  var ngmod = angular.module('archivist.webapp');

  ngmod.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //Redirect unknown states/urls to '/home'
        $urlRouterProvider.otherwise('/home');

        //Set HTML5 mode (if true --> pretty urls enabled)
        $locationProvider.html5Mode({
          enabled: false,
          requireBase: false //no <base> in index.html required (https://docs.angularjs.org/error/$location/nobase)
        });

        //Configure states
        $stateProvider
            .state('home',
            {
                url: '/home',
                templateUrl: '/partials/home.html',
                controller: 'HomeCtrl'
            });
    }]);
})(angular);