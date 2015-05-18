'use strict';

var app = angular.module('app');

app.controller('GridController', ['$scope', 'restDataProvider', 'localstorageDataProvider', function ($scope, restDataProvider, localstorageDataProvider) {
    var pageSize = 20;
    var frameEnd = -1;
    var loading = false;

    $scope.list = [];
    $scope.sortKey = 'login';
    $scope.sortOrder = 1;

    $scope.init = function (source, param) {
        if (source === 'rest') {
            $scope.provider = restDataProvider;
            $scope.provider.url = param;
        } else if (source === 'localstorage') {
            $scope.provider = localstorageDataProvider;
            $scope.provider.prefix = param;
        } else {
            throw new Error('Unknown DataProvider type');
        }

        $scope.append();
    };

    $scope.sort = function(key) {
        if (key === $scope.sortKey) {
            $scope.sortOrder *= -1;
        } else {
            $scope.sortOrder = 1;
            $scope.sortKey = key;
        }

        frameEnd = -1;
        $scope.append(true);
    };

    $scope.append = function(clear) {
        if (loading || !$scope.provider) return;

        var start = frameEnd + 1;
        var end = start + pageSize - 1;

        loading = true;

        $scope.provider.get(start, end + 1, $scope.sortKey, $scope.sortOrder).then(function (data) {
            var _list = [];

            if (clear) {
                _list = data;
            } else {
                _list = $scope.list.concat(data);
            }

            frameEnd = end;
            $scope.list = _list;
            loading = false;
        }, function () {
        });
    };
}]);
