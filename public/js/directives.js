'use strict';

var app = angular.module('app');

app.directive('ngGrid', function () {
    return {
        restrict: 'EA',
        templateUrl: 'grid.html'
    }
});

app.directive('ngFixedToolbar', ['$window', function ($window) {
    function link(scope, element, attrs) {
        var toolbarTop = element.position().top;
        var toolbarWidth = element.width();
        var viewport = $($window);

        viewport.on('scroll', function () {
            if (viewport.scrollTop() >= toolbarTop) {
                element.addClass('grid__toolbar_fixed').width(toolbarWidth);
            } else {
                element.removeClass('grid__toolbar_fixed').width('auto');
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    }
}]);

app.directive('ngEndlessScroll', ['$window', '$document', function ($window, $document) {
    function link(scope, element, attrs) {
        var viewport = $($window);
        var viewportHeight = viewport.height();

        viewport.on('scroll', function () {
            var documentHeight = $($document).height();
            var scrollTop = viewport.scrollTop();

            if (documentHeight - viewportHeight - scrollTop < 200) {
                scope.append();
            }
        });
    }

    return {
        restrict: 'A',
        scope: {
            append: '&ngEndlessScrollAppend'
        },
        transclude: true,
        link: link,
        template: '<div class="ng-endless-scroll" ng-transclude></div>'
    }
}]);
