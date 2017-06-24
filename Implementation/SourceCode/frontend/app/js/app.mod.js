(function (angular) {
  var ngapp = angular.module('archivist.webapp',
    [
      'ngAnimate',
      'ui.router',
      'LocalStorageModule',
      'archivist.navigation',
      'archivist.error',
      'archivist.home',
      'archivist.musicpiece',
      'archivist.scores',
      'ngFileUpload'
    ]);
})(angular);