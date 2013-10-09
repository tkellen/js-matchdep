/*
 * matchdep
 * https://github.com/tkellen/node-matchdep
 *
 * Copyright (c) 2012 Tyler Kellen
 * Licensed under the MIT license.
 */

'use strict';

var minimatch = require('minimatch');
var findup = require('findup-sync');

// export object
var matchdep = module.exports = {};

// Ensure configuration has devDep and dependencies keys
function loadConfig(config, props) {
  // if no config defined, resolve to nearest package.json
  if (config == null) {
    config = findup('./package.json');
  }

  // if package is a string, try to require it
  if (typeof config === 'string') {
    config = require(config);
  }

  // if config is not an object yet, something is amiss
  if (typeof config !== 'object') {
    throw new Error('Invalid configuration specified.');
  }

  // For all specified props, populate result object.
  var result = {};
  props.forEach(function(prop) {
    result[prop] = config[prop] ? Object.keys(config[prop]) : [];
  });
  return result;
}

// What config properties should each method search?
var methods = {
  filter: ['dependencies'],
  filterDev: ['devDependencies'],
  filterPeer: ['peerDependencies'],
  filterAll: ['dependencies', 'devDependencies', 'peerDependencies'],
};

// Dynamically generate methods.
Object.keys(methods).forEach(function(method) {
  var props = methods[method];
  matchdep[method] = function(pattern, config) {
    config = loadConfig(config, props);
    var search = props.reduce(function(result, prop) {
      return result.concat(config[prop]);
    }, []);
    return minimatch.match(search, pattern, {});
  };
});
