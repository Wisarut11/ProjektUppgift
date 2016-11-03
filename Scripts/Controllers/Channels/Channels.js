/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("ChannelsController", [
        "$scope",
        "chatApi",
        function ($scope, chatApi) {
            $scope.title = "ProjektUppgift";

            $scope.unsubscribe = function (id) {
                var index = $scope.data.subscribedChannels.indexOf(id);
                $scope.data.subscribedChannels.splice(index, 1);

                $scope.getFeed();
                $scope.savesubscribedChannels();
            };
        }
    ]);