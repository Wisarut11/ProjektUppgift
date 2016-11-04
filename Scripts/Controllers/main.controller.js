/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("MainController", [
        "$scope",
        "$location",
        "$route",
        "chatApi",
        "$timeout",

        function ($scope, $location, $route, chatApi, $timeout) {
            $scope.$route = $route;
            $scope.data = {
                messages: [],
                channels: [],
                channel: {},
                subscribedChannels: [],
                feed: []
            };

            

            //$scope.feed = [];

            $scope.getFeed = function () {
                $scope.feed = $scope.data.channels.filter(function (channel) {
                    return $scope.data.subscribedChannels.indexOf(channel.id) != -1;
                });
            };

            //var poll = function () {
            //    $timeout(function () {
            //        chatApi.getChannels()
            //        .then(function (data) {
            //            $scope.channels = data;
            //            if (data != null) {
            //                $scope.channels = data;
            //                $scope.getFeed();
            //            }
            //        });

            //        chatApi.getMessages()
            //        .then(function (data) {
            //            $scope.messages = data;
            //            if (data != null) {
            //                $scope.messages = data;
            //                $scope.getFeed();
            //            }
            //        });
            //        poll();
            //    }, 1000);
            //};


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