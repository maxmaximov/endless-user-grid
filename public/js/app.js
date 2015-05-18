'use strict';

try {
    if (!JSON.parse(localStorage.getItem('test-data')).length) throw new Error();
} catch (e) {
    $.get('/data/mock.json', function (data) {
        localStorage.setItem('test-data', JSON.stringify(data));
    });
}

var app = angular.module('app', []);

require('./services');
require('./controllers');
require('./directives');
