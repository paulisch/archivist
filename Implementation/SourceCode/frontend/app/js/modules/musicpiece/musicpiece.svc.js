(function (angular) {
    var ngmod = angular.module('archivist.musicpiece');

    /**
     * MusicPieceService
     * Service for musicpiece-page of the app.
     */
    ngmod.service('MusicPieceService', ['MainService', function(MainService) {
        'use strict';

        function getMusicPiece(id) {
            return MainService.httpRequest('GET', '/musicpieces/get/'+id);
        }

        function getGenres() {
            return MainService.httpRequest('GET', '/genres/get');
        }

        function addOrUpdateMusicpiece(musicpiece) {
            return MainService.httpRequest('POST', '/musicpieces/add', musicpiece);
        }

        function deleteMusicPiece(musicPieceId) {
            return MainService.httpRequest('DELETE', '/musicpieces/delete/' + musicPieceId);
        }

        function getInstruments() {
            return MainService.httpRequest('GET', '/instruments/get');
        }

        //Return service object
        return {
            getMusicPiece : getMusicPiece,
            getGenres : getGenres,
            addOrUpdateMusicpiece : addOrUpdateMusicpiece,
            deleteMusicPiece : deleteMusicPiece,
            getInstruments : getInstruments
        };
    }]);
})(angular);