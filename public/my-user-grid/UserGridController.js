'use strict';

var grid = angular.module('myUserGrid');

grid.controller('UserGridController', ['$scope', 'restDataProvider', 'localstorageDataProvider', function ($scope, restDataProvider, localstorageDataProvider) {
    var pageSize = 20;
    var maxFrameSize = 100;
    var frameStart = 0;
    var frameEnd = -1;
    var loading = false;

    $scope.list = [];
    $scope.sortKey = 'login';
    $scope.sortOrder = 1;

    $scope.buildProvider = function (source, param) {
        if (source === 'rest') {
            restDataProvider.url = param;
            $scope.provider = restDataProvider;
        } else if (source === 'localstorage') {
            localstorageDataProvider.prefix = param;
            $scope.provider = localstorageDataProvider;
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

        $scope.list = [];
        frameStart = 0;
        frameEnd = -1;
        $scope.append();
    }

    $scope.append = function() {
        if (loading) return;

        var start = frameEnd + 1;
        var end = start + pageSize - 1;

        loading = true;

        $scope.provider.get(start, end + 1, $scope.sortKey, $scope.sortOrder).then(function (data) {
            var _list = $scope.list.concat(data);
            var oversize = _list.length - maxFrameSize;

            if (oversize > 0) {
                _list = _list.slice(oversize);
                $scope.oversize(oversize);
                frameStart += oversize;
            }

            frameEnd = end;
            $scope.list = _list;
            loading = false;
        }, function () {
        });
    };

    $scope.prepend = function() {
        if (loading) return;

        var end = frameStart - 1;
        if (end < 0) return 0;

        var start = end - pageSize + 1;
        if (start < 0) {
        }

        loading = true;

        $scope.provider.get(start, end + 1, $scope.sortKey, $scope.sortOrder).then(function (data) {
            var _list = data.concat($scope.list);
            var oversize = _list.length - maxFrameSize;

            if (oversize > 0) {
                _list = _list.slice(0, maxFrameSize);
                $scope.oversize(oversize);
                frameEnd -= oversize;
            }

            frameStart = start;
            $scope.list = _list;
            loading = false;
        }, function () {
        });
    };
}]);
