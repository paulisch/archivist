(function (angular) {
    var ngmod = angular.module('archivist.home');

    /**
     * HomeService
     * Service for home-page of the app.
     */
    ngmod.service('HomeService', ['MainService', function(MainService) {
        'use strict';

        function getMusicPieces() {
            return MainService.httpRequest('GET', '/musicpieces/get');
        }

        function deleteMusicPieces(musicPieceIds) {
            var idsAsStr = "";
            for(var i = 0; i<musicPieceIds.length; i++) {
              idsAsStr += musicPieceIds[i] + ",";
            }
            idsAsStr = idsAsStr.substr(0, idsAsStr.length - 1);
            return MainService.httpRequest('DELETE', '/musicpieces/delete/' + idsAsStr);
        }

        //Return service object
        return {
            getMusicPieces : getMusicPieces,
            deleteMusicPieces : deleteMusicPieces
        };
    }]);
})(angular);