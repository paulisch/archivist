(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.musicpiece');
    ngmod.controller('MusicPieceCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams',
        function ($scope, MusicPieceService, AppConstants, $stateParams) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicPieceForEditing = null;
            $scope.musicpieceLoaded = false;
            
            if ($scope.musicPieceId) {
                $scope.mode = "view";
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.mode = "edit";
                $scope.musicPieceForEditing = { };
                $scope.musicpieceLoaded = true;
            }
                        
            //Action bar
            $scope.header = {
                text : "Neues Musikstück",
                showBackButton : true
            };
            $scope.actionButtons = [
                {
                    label: "Bearbeiten",
                    icon: "fa fa-pencil",
                    disabled: editActionDisabled,
                    onclick: onEditAction,
                    hidden: function() { return $scope.mode != "view"; }
                },
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
                    hidden: function() { return $scope.mode != "view"; }
                },
                {
                    label: "Speichern",
                    icon: "fa fa-floppy-o",
                    disabled: saveActionDisabled,
                    onclick: onSaveAction,
                    hidden: function() { return $scope.mode != "edit"; }
                },
                {
                    label: "Abbrechen",
                    icon: "fa fa-window-close",
                    disabled: cancelActionDisabled,
                    onclick: onCancelAction,
                    hidden: function() { return $scope.mode != "edit"; }
                }
            ];
            $scope.getDifficultyLabel = getDifficultyLabel;
            
            //Action bar methods
            function deleteActionDisabled() {
                return $scope.mode != "view";
            }
            function onDeleteAction() {
                
            }
            
            function editActionDisabled() {
                return $scope.mode != "view";
            }
            function onEditAction() {
                $scope.musicPieceForEditing = angular.extend({ }, $scope.musicpiece);
                $scope.mode = "edit";
            }
            
            function saveActionDisabled() {
                return $scope.mode != "edit";
            }
            function onSaveAction() {
                var navigateBack = $scope.musicpiece === null;
                $scope.header.text = $scope.musicpiece.musicPieceName;
                $scope.mode = "view";
            }
            
            function cancelActionDisabled() {
                return $scope.mode != "edit";
            }
            function onCancelAction() {
                var navigateBack = $scope.musicpiece === null;
                $scope.mode = "view";
            }
            
            
            //Controller methods            
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;                    
                    $scope.header.text = $scope.musicpiece.musicPieceName;                    
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