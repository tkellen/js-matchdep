# matchdep [![Build Status](https://secure.travis-ci.org/tkellen/node-matchdep.png?branch=master)](http://travis-ci.org/tkellen/node-matchdep)

> Use minimatch to filter npm module dependencies by name.

## Examples

```js
var matchdep = require('matchdep');

// Filter dependencies (by autoloading nearest package.json)
matchdep.filter('mini*');

// Filter devDependencies (with config string indicating file to be required)
matchdep.filterDev('grunt-contrib-*', './package.json');

// Filter peerDependencies (with config string indicating file to be required)
matchdep.filterDev('foo-{bar,baz}', './some-other.json');

// Filter all dependencies (with explicit config provided)
matchdep.filterAll('*', require('./yet-another.json'));
```

## Usage

```js
filter(pattern, config)
filterDev(pattern, config)
filterPeer(pattern, config)
filterAll(pattern, config)
```

### pattern
Type: `String`
Default: none

[minimatch](https://github.com/isaacs/minimatch) compatible pattern to filter dependencies.

### config
Type: `String` or `Object`
Default: Path to nearest package.json.

If config is a string, matchdep will attempt to require it.  If it is an object, it will be used directly.
