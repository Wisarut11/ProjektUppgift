/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("ChannelController", [
        "$scope",
        "$routeParams",
        "chatApi",
        function ($scope, $routeParams, chatApi) {
            $scope.newMessage = {};
            $scope.$watch("data.messages", function (channels) {
                $scope.channel = $scope.data.channels.filter(function (channel) {
                    return channel.id == $routeParams.id;
                })[0];
                //console.log($scope.channel);

            });


            //$scope.channel = $scope.data.channels.filter(function (channel) {
            //    return channel.id == $routeParams.id;
            //})[0];

            chatApi.getMessages()
				.then(function (data) {
				    if (data != null) {
				        $scope.data.messages = data;
				    }
				});

            $scope.sendMessage = function () {
                chatApi.addMessages($scope.newMessage)
				.then(function (data) {
				    if (data != null) {
				        $scope.data.messages = data;
				    }
				});
            };

            angular.forEach($scope.data.channels, function (channel) {

            });
        }
    ]);