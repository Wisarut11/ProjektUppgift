/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("MainController", [
        "$scope",
        "$location",
        "$route",
        "chatApi",
        function ($scope, $location, $route, chatApi) {
            $scope.$route = $route;
            $scope.data = {
                messages: [],
                channels: [],
                subscribedChannels: [],
                feed: []
            };

            
            //$scope.feed = [];

            $scope.getFeed = function () {
                $scope.feed = $scope.data.channels.filter(function (channel) {
                    return $scope.data.subscribedChannels.indexOf(channel.id) != -1;
                });
            };

            chatApi.getChannels()
                .then(function (data) {
                    if (data != null) {
                        $scope.data.channels = data;
                    }
                });

            $scope.subscribe = function (channel) {
                $scope.data.subscribedChannels.push(channel);
                $scope.savesubscribedChannels();
            };

            $scope.loadSubscribtions = function () {
                var dataString = localStorage.getItem("subscribedChannels");
                if (dataString) {
                   $scope.data.subscribedChannels = JSON.parse(dataString);
                }
            };

            $scope.savesubscribedChannels = function () {
                var jsonString = JSON.stringify($scope.data.subscribedChannels);
                localStorage.setItem("subscribedChannels", jsonString);
            };
            
            $scope.loadSubscribtions();

            $scope.go = function (url) {
                $location.path(url);
            };
        }
    ]);