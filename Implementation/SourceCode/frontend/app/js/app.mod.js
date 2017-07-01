(function (angular) {
    /**
     * archivist.webapp
     * Global angular module for the archivist frontend referencing all dependencies.
     */
    var ngapp = angular.module('archivist.webapp', [
        'ngAnimate',
        'ui.router',
        'LocalStorageModule',
        'ngFileUpload',
        'archivist.navigation',
        'archivist.error',
        'archivist.home',
        'archivist.musicpiece',
        'archivist.scores'
    ]);
})(angular);