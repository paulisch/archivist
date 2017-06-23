(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.scores');
    ngmod.controller('AddScoreCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams',
        function ($scope, MusicPieceService, AppConstants, $stateParams) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = false;
            
            if ($scope.musicPieceId) {
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.musicpieceLoaded = true;
            }
            
            //Action bar
            $scope.header = {
                text : "Neue Stimme",
                showBackButton : true
            };
            $scope.actionButtons = [];
            
            
            //Controller methods
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;                    
                    $scope.header.text = "Neue Stimme für " + $scope.musicpiece.musicPieceName;
                    $scope.musicpieceLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpieceLoaded = true;
                });
            }
    }]);
})(angular);