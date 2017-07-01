(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.error');
    
    /**
     * ErrorCtrl
     * Error controller for displaying errors.
     */
    ngmod.controller('ErrorCtrl', [
        '$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.error = $stateParams.error;
        }]);
})(angular);