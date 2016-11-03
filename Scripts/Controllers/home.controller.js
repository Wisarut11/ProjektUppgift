/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("HomeController", [
        "$scope",
        function ($scope) {
            $scope.title = "Home";
        }
    ]);