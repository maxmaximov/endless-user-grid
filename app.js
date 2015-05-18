#!/usr/bin/env node

var http = require('http');
var path = require('path');
var express = require('express');
var debug = require('debug')('endless-user-grid:server');

var app = express();

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', function () {
  var addr = server.address();
  var bind = 'port ' + addr.port;
  debug('Listening on ' + bind);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    res.status(404);
});

module.exports = app;
