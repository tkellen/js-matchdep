# matchdep
> Use minimatch to filter npm module dependencies by name.

## Usage

```js
var matchdep = require('matchdep');

// Filter dependencies
matchdep.filter(require('./package.json'), 'grunt-contrib*');

// Filter devDependencies
matchdep.filterDev(require('./package.json'), 'mini*');

// Filter all dependencies
matchdep.filterAll(require('./package.json'), '*');
```

> Copyright (c) 2012 Tyler Kellen. See LICENSE for further details.
