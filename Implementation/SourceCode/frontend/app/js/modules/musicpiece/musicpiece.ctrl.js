(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.musicpiece');
    ngmod.controller('MusicPieceCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams',
        function ($scope, MusicPieceService, AppConstants, $stateParams) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = true; //TODO false
            
            //<a ui-sref="pieceState({musicPieceId:'<id>'})">piece</a>
            
            loadMusicPiece();
                        
            //Action bar
            $scope.header = "NameStück>";
            $scope.actionButtons = [
                {
                    label: "Bearbeiten",
                    icon: "fa fa-pencil",
                    disabled: editActionDisabled,
                    onclick: onEditAction,
                    hidden: function() { return false; }
                },
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
                    hidden: function() { return false; }
                }
            ];
            
            //Action bar methods
            function deleteActionDisabled() {
                return false;
            }
            function onDeleteAction() {
                
            }
            
            function editActionDisabled() {
                return false;
            }
            function onEditAction() {
                
            }
            
            
            //Controller methods            
            function loadMusicPiece() {
            //    HomeService.getMusicPiece(id).then(function successCallback(response) {
            //        $scope.musicpiece = response.data;                    
            //        $scope.musicpieceLoaded = true;
            //    }, function errorCallback(response) {
            //        console.log(response);
            //        $scope.musicpieceLoaded = true;
            //    });
            }
    }]);
})(angular);