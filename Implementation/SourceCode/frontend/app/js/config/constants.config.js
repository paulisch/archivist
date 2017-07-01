(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.webapp');
    
    /**
     * AppConstants
     * Global constants used for archivist.
     */
    ngmod.constant('AppConstants', {
        difficulties : [
            {
                id : 1,
                label : 'A'
            },
            {
                id : 2,
                label : 'B'
            },
            {
                id : 3,
                label : 'C'
            },
            {
                id : 4,
                label : 'D'
            },
            {
                id : 5,
                label : 'E'
            }
        ],
        instrumentNos : [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]
    });
})(angular);