/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("ChannelController", [
        "$scope",
        "$routeParams",
        "chatApi",
        "Hub",
        "$rootScope",
        "$timeout",
        function ($scope, $routeParams, chatApi, Hub, $rootScope, $timeout) {
            $scope.title = "Messages";
            $scope.newMessage = {};

            $scope.$watch("data.channels", function (channels) {
                $scope.channel = $scope.data.channels.filter(function (channel) {
                    return channel.id == $routeParams.id;
                })[0];
                //console.log($scope.channel);

            });

            //SignalR
            var path = 'http://dummyapi.kodalagom.se/signalr';


            var hub = new Hub('chatHub', {

                rootPath: path,

                listeners: {
                    'recieveMessage': function (message) {
                        $scope.$apply(function () {
                            $scope.channel.messages.push(message);
                        });

                        console.log('recieved' + message);
                    }
                },
                ////Kollar alla kontakt errors
                errorHandler: function (error) {
                    console.error(error);
                },
                    stateChanged: function (state) {
                        switch (state.newState) {
                            case $.signalR.connectionState.connecting:
                                console.log("signalR.connectionState.connecting" + state.newState);
                                //your code here
                                break;
                            case $.signalR.connectionState.connected:
                                console.log("signalR.connectionState.connected" + state.newState);
                                //your code here
                                break;
                            case $.signalR.connectionState.reconnecting:
                                console.log("signalR.connectionState.reconnecting" + state.newState);
                                //your code here
                                break;
                            case $.signalR.connectionState.disconnected:
                                console.log("signalR.connectionState.disconnected" + state.newState);
                                //your code here
                                break;
                        }
                    }

                });

            //$scope.channel = $scope.data.channels.filter(function (channel) {
            //    return channel.id == $routeParams.id;
            //})[0];

            chatApi.getMessages()
        .then(function (data) {
            if (data != null) {
                $scope.messages = data;
            }
        });

            $scope.addMessage = function () {
                $scope.newMessage.channelId = $scope.channel.id;
                chatApi.addMessages($scope.newMessage)
		    		.then(function (data) {
		    		    //if (data != null) {
		    		    //}
		    		    $scope.message = {};
		    		});
            };

            angular.forEach($scope.channels, function (channel) {

            });
        }
    ]);