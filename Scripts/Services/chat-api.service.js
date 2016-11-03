angular.module("mainModule")
    .service("chatApi", [
        "$http",
        "$q",
        function ($http, $q) {
            var api = "http://dummyapi.kodalagom.se/api";
            var messages = api + "/messages";
            var channels = api + "/channels";


            // Add Messages 
            this.addMessages = function (newMessage) {
                var deferred = $q.defer();

                $http.post(messages, newMessage)
                    .then(function (response) {
                        deferred.resolve(response.data);

                    }, function (response) {
                        deferred.resolve([]);
                    });
                return deferred.promise;
            };


            // Get Messages
            this.getMessages = function () {
                var deferred = $q.defer();

                $http.get(messages)
                    .then(function (response) {
                        this.messages = response.data;
                        deferred.resolve(response.date);
                    }, function () {
                        deferred.resolve([]);
                    });
                return deferred.promise;
            };

            // Create Channel
            this.addChannel = function (newChannel) {
                var deferred = $q.defer();

                $http.post(channels, newChannel)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function () {
                        deferred.resolve([]);
                    });
                return deferred.promise;
            };

            // Get Channel
            this.getChannels = function () {
                var deferred = $q.defer();

                $http.get(channels)
                .then(function (response) {
                    deferred.resolve(response.data);

                }, function () {
                    deferred.resolve([]);
                });
                return deferred.promise;
            };

            // Delete Channel
            this.deleteChannel = function (id) {
                var deferred = $q.defer();

                $http.delete(channels + '/' + id)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function () {
                        deferred.resolve([]);
                    });
                return deferred.promise;
            };

        }
    ]);