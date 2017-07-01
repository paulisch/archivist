(function (angular) {
    angular.module('archivist.navigation')
    
    /**
     * actionbar
     * actionbar directive for displaying the actionbar of the navigation-section of the app.
     */
    .directive('actionbar', ['NavigationService', '$timeout', function(NavigationService, $timeout) {
        return {
            templateUrl: 'partials/actionbar.tpl.html',
            scope: {
                header: '=',
                actionButtons: '='
            },
            restrict: 'AE',
            controller: ['$scope', '$attrs', '$state', '$window', function ($scope, $attrs, $state, $window) {
                //Back-button
                $scope.goBack = function() {
                    $window.history.back();
                };
            }],
            link: function (scope, element, attrs, controller, transcludeFn) { }
        };
    }]);
})(angular);