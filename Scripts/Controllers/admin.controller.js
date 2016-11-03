/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("AdminController", [
        "$scope",
        "chatApi",
        function ($scope, chatApi) {
            $scope.title = "Admin";
            $scope.channels = [];

            $scope.newChannel = {};

            //Create channels
            $scope.addChannel = function () {
                chatApi.addChannel($scope.newChannel)
                    .then(function (data) {
                        if (data != null) {
                            $scope.data.channels.push(data);
                            $scope.newChannel = {};
                        }
                    });
            };

            //Delete channels
            $scope.deleteChannel = function (channel) {
                chatApi.deleteChannel(channel.id)
                    .then(function () {
                        var index = $scope.data.channels.map(function (channel) {
                            return channel.id;
                        }).indexOf(channel.id);
                        $scope.data.channels.splice(index, 1);
                    });
            };


           
            //$scope.getFeed();
        }
    ]);