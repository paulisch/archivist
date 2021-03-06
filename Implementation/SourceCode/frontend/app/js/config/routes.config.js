(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.webapp');

    /**
     * routes-config
     * Configuration of all routes that can be navigated to through the archivist frontend.
     */
    ngmod.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //Redirect unknown states/urls to '/home'
        $urlRouterProvider.otherwise('/home');

        //Set HTML5 mode (if true --> pretty urls enabled)
        $locationProvider.html5Mode({
          enabled: false,
          requireBase: true //<base> tag in index.html required (https://docs.angularjs.org/error/$location/nobase)
        });

        //Configure states
        $stateProvider
            .state('error',
            {
                url: '/error',
                templateUrl: 'partials/error.html',
                controller: 'ErrorCtrl',
                params : { error: null }
            })
            .state('home',
            {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            })
            .state('musicpiece',
            {
                url: '/musicpiece/:musicPieceId',
                templateUrl: 'partials/musicpiece.html',
                controller: 'MusicPieceCtrl',
                params : { musicPieceId: null }
            })            
            .state('scores',
            {
                url: '/scores/:musicPieceId',
                templateUrl: 'partials/scores.html',
                controller: 'ScoresCtrl',
                params : { musicPieceId: null }
            })
            .state('addscore',
            {
                url: '/addscore/:musicPieceId',
                templateUrl: 'partials/addscore.html',
                controller: 'AddScoreCtrl',
                params : { musicPieceId: null }
            });
    }]);
})(angular);