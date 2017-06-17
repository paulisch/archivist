(function (angular) {
  angular.module('archivist.navigation')
    .directive('header', [function() {
      return {
        templateUrl: 'partials/header.tpl.html',
        scope: { },
        restrict: 'E',
        controller: ['$scope', '$attrs', 'NavigationService', '$timeout', '$window', function ($scope, $attrs, NavigationService, $timeout, $window) {
            $scope.editMode = false;
            $scope.orgName = NavigationService.getOrganisationName();
            
            $scope.edit = function() {
                $scope.editMode = true;
                $timeout(function() {
                    var element = $window.document.getElementById('orgNameInp');
                    if(element) {
                        element.focus();
                        element.setSelectionRange(0, element.value.length);
                    }
                });
            };
            $scope.saveOrgName = function(orgName) {
                $scope.orgName = orgName;
                NavigationService.setOrganisationName($scope.orgName);
                $scope.editMode = false;
            };
        }],
        link: function (scope) {
            
        }
      };
    }]);
})(angular);