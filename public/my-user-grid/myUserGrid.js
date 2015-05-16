'use strict';

var grid = angular.module('myUserGrid');

grid.directive('myUserGrid', function () {
    function link(scope, element, attrs) {
        scope.buildProvider(attrs.source, attrs.url || attrs.prefix);

        var viewport = element.find('.my-user-grid__body');
        var wrapper = element.find('.my-user-grid__body__wrapper');

        var viewportHeight = viewport.height();

        scope.oversize = function (n) {
            var rowHeight = element.find('.my-user-grid__body__row').height();
            var scrollTop = viewport.scrollTop();
            viewport.scrollTop(scrollTop + n * (rowHeight + 1));
        }

        viewport.on('scroll', function () {
            var wrapperHeight = wrapper.height();
            var scrollTop = viewport.scrollTop();

            if (wrapperHeight - viewportHeight - scrollTop < 100) {
                scope.append();
            } else if (scrollTop < 200) {
                scope.prepend();
            }
        });
    }

    return {
        templateUrl: '/my-user-grid/my-user-grid.html',
        controller: 'UserGridController',
        link: link,
        scope: {},
        replace: true
    }
});
