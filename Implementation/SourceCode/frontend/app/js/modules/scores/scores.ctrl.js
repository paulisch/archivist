(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.scores');
    ngmod.controller('ScoresCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams',
        function ($scope, MusicPieceService, AppConstants, $stateParams) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = false;
            $scope.onCheck = onCheck;
            
            if ($scope.musicPieceId) {
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.musicpieceLoaded = true;
            }
                        
            //Action bar
            $scope.header = {
                text : "Noten",
                showBackButton : true
            };
            $scope.actionButtons = [
                {
                    label: "Hinzufügen",
                    icon: "fa fa-plus-square",
                    disabled: addActionDisabled,
                    onclick: onAddAction,
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
                if ($scope.musicpiece.scores) {
                    for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                        if($scope.musicpiece.scores[i].isSelected)
                            return false;
                    }
                }
                return true;
            }
            function onDeleteAction() {
                
            }
            
            function addActionDisabled() {
                return false;
            }
            function onAddAction() {
                
            }
            
            
            //Controller methods
            function onCheck(score) {
                score.isSelected = !score.isSelected;
            }
            
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;                    
                    $scope.header.text = $scope.musicpiece.musicPieceName + " - Noten";    
                    
                    for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                        $scope.musicpiece.scores[i].isSelected = false;
                    }
                    $scope.musicpieceLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpieceLoaded = true;
                });
            }
    }]);
})(angular);