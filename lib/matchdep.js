/*
 * matchdep
 * https://github.com/tkellen/node-matchdep
 *
 * Copyright (c) 2012 Tyler Kellen
 * Licensed under the MIT license.
 */

'use strict';

var minimatch = require('minimatch');

// export object
var matchdep = module.exports = {};

// Ensure configuration has devDep and dependencies keys
function loadConfig(pkg) {

  // if result is not an object, something is amiss
  if (typeof pkg !== 'object') {
    throw new Error("Invalid configuration specified.");
  }

  // ensure dependencies key exists
  if(pkg.devDependencies === undefined) {
    pkg.dependencies = {};
  }

  // ensure devDependencies key exists
  if(pkg.devDependencies === undefined) {
    pkg.devDependencies = {};
  }

  return pkg;
}

// filter dependencies
matchdep.filter = function(config, pattern) {
  var pkg = loadConfig(config);
  var search = Object.keys(pkg.dependencies);
  return minimatch.match(search, pattern, {});
};

// filter devDependencies
matchdep.filterDev = function(config, pattern) {
  var pkg = loadConfig(config);
  var search = Object.keys(pkg.devDependencies);
  return minimatch.match(search, pattern, {});
};

// filter all dependencies
matchdep.filterAll = function(config, pattern) {
  var pkg = loadConfig(config);
  var search = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies));
  return minimatch.match(search, pattern, {});
};

