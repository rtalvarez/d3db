'use strict';

var express = require('express');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// // Start server
// app.listen(config.port, config.ip, function () {
//   console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
// });

// Start server
app.listen(config.port, function () {
  console.log('Port is: ', config.port);
  console.log('IP is: ', config.ip);
  console.log('Env is: ', process.env);
  console.log('Express server listening on port %s, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
