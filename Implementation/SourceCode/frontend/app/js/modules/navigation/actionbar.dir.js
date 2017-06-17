(function (angular) {
  angular.module('archivist.navigation')
    .directive('actionbar', ['NavigationService', '$timeout', '$window', function(NavigationService, $timeout, $window) {
      return {
        templateUrl: 'partials/actionbar.tpl.html',
        scope: {
            header: '=',
            actionButtons: '='
        },
        restrict: 'AE',
        controller: ['$scope', '$attrs', function ($scope, $attrs) {
            
        }],
        link: function (scope, element, attrs, controller, transcludeFn) {
            
        }
      };
    }]);
})(angular);