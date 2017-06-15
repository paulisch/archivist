(function (angular) {
  var ngapp = angular.module('archivist.webapp',
    [
      'ngAnimate',
      'ui.router',
      'LocalStorageModule',
      'archivist.navigation',
      'archivist.home'
    ]);
})(angular);