(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.musicpiece');
    ngmod.controller('MusicPieceCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams',
        function ($scope, MusicPieceService, AppConstants, $stateParams) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = false;
            
            //<a ui-sref="pieceState({musicPieceId:'<id>'})">piece</a>
            
            if ($scope.musicPieceId) {
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.musicpieceLoaded = true;
            }
                        
            //Action bar
            $scope.header = "Neues Musikstück";
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
            $scope.getDifficultyLabel = getDifficultyLabel;
            
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
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;                    
                    $scope.header = $scope.musicpiece.musicPieceName;
                    $scope.musicpieceLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpieceLoaded = true;
                });
            }
            
            function getDifficultyLabel(difficulty) {
                var difficulties = AppConstants.difficulties;
                var result = null;
                for(var i=0; i<difficulties.length; i++) {
                    var diff = difficulties[i];
                    if (diff.id == difficulty) {
                        result = diff.label;
                    }
                }
                return result;
            }
    }]);
})(angular);