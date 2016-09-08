#!/usr/bin/env node
var path = require('path')
var rootDir = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

try {
    var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
    global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
      .development(false)
      .server(rootDir, function() {
        require(path.join(__dirname, '../server'))
      });
} catch (e) {
  if (e && e.code === 'MODULE_NOT_FOUND') {
    console.log('run `npm compile` first!')
    process.exit(1)
  }
  console.log('app started with error and exited', e)
  process.exit(1)
}

console.log('app started in production mode')
