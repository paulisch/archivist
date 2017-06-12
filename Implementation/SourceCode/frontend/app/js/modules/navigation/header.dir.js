(function (angular) {
  angular.module('archivist.navigation')
    .directive('header', ['NavigationService', '$timeout', '$window', function(NavigationService, $timeout, $window) {
      return {
        templateUrl: '/partials/header.tpl.html',
        link: function (scope) {
            scope.editMode = false;
            scope.orgName = NavigationService.getOrganisationName();
            
            scope.edit = function() {
                scope.editMode = true;
                
                $timeout(function() {
                    var element = $window.document.getElementById('orgNameInp');
                    if(element) {
                        element.focus();
                        element.setSelectionRange(0, element.value.length);
                    }
                });
            };
            scope.saveOrgName = function(orgName) {
                scope.orgName = orgName;
                NavigationService.setOrganisationName(scope.orgName);
                scope.editMode = false;
            };
        }
      };
    }]);
})(angular);