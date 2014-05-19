'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

console.log('__dirname: ', __dirname);

module.exports = {
  root: rootPath,
  port: process.env.PORT || 9000
};

console.log('rootPath: ', module.exports.root);