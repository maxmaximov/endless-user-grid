'use strict';

var grid = angular.module('ngUserGrid', []);

grid.controller('UserGridController', ['$scope', '$http', function ($scope, $http) {
    var list = [];
    var frameStart = 0;
    var frameEnd = -1;
    var pageSize = 20;
    var maxFrameSize = 100;

    function sort(a, b) {
        var key = $scope.sortKey;
        if (a[key] > b[key]) return $scope.sortOrder;
        if (a[key] < b[key]) return $scope.sortOrder * -1;
        return 0;
    }

    $scope.list = [];
    $scope.sortKey = 'login';
    $scope.sortOrder = 1;

    $scope.sort = function(key) {
        if (key === $scope.sortKey) {
            $scope.sortOrder *= -1;
        } else {
            $scope.sortOrder = 1;
            $scope.sortKey = key;
        }

        frameStart = 0;
        frameEnd = pageSize - 1;
        $scope.list = list.sort(sort).slice(0, pageSize - 1);
    }

    $scope.append = function() {
        var start = frameEnd + 1;
        var end = start + pageSize - 1;

        var _list = $scope.list.concat(list.sort(sort).slice(start, end + 1));

        var oversize = _list.length - maxFrameSize;

        if (oversize < 0) {
            oversize = 0;
        }

        if (oversize) {
            _list = _list.slice(oversize);
        }

        frameStart += oversize;
        frameEnd = end;

        $scope.list = _list;

        return oversize;
    };

    $scope.prepend = function() {
        var end = frameStart - 1;
        if (end < 0) return 0;

        var start = end - pageSize + 1;
        if (start < 0) {
        }

        var _list = list.sort(sort).slice(start, end + 1).concat($scope.list);

        var oversize = _list.length - maxFrameSize;

        if (oversize < 0) {
            oversize = 0;
        }

        if (oversize) {
            _list = _list.slice(0, maxFrameSize);
        }

        frameStart = start;
        frameEnd -= oversize;

        $scope.list = _list;

        return oversize;
    };

    $http.get('/demo/data/mock.json').
        success(function(data, status, headers, config) {
            list = data;
            window.j = data;

            $scope.append();
        }).
        error(function(data, status, headers, config) {
            console.error(status, data);
        });
}]);

grid.directive('ngUserGrid', function () {
    function link(scope, element, attrs) {
        var viewport = element.find('.ng-user-grid__body');
        var wrapper = element.find('.ng-user-grid__body__wrapper');

        var viewportHeight = viewport.height();

        viewport.on('scroll', function () {
            var wrapperHeight = wrapper.height();
            var rowHeight = element.find('.ng-user-grid__body__row').height();
            var scrollTop = viewport.scrollTop();

            if (wrapperHeight - viewportHeight - scrollTop < 100) {
                var oversize = scope.append();

                if (oversize) {
                    viewport.scrollTop(scrollTop - oversize * (rowHeight + 1));
                }

                scope.$digest();
            } else if (scrollTop < 200) {
                var oversize = scope.prepend();

                if (oversize) {
                    viewport.scrollTop(scrollTop + oversize * (rowHeight + 1));
                }

                scope.$digest();
            }
        });
    }

    return {
        templateUrl: '/ng-user-grid/ng-user-grid.html',
        controller: 'UserGridController',
        link: link,
        scope: {},
        replace: true
    }
});
