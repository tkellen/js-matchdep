'use strict';

var matchdep = require('../lib/matchdep');

exports['matchdep'] = {
  filter: function(test) {
    test.expect(2);
    test.equal(matchdep.filter('*').join(), 'minimatch', 'should find all dependencies with "*"');
    test.equal(matchdep.filter('').join(), '', 'should find no dependencies with ""');
    test.done();
  },
  filterDev: function(test) {
    test.expect(2);
    test.equal(matchdep.filterDev('*').join(), 'grunt-contrib-jshint,grunt-contrib-nodeunit,grunt,grunt-cli', 'should find all devDependencies with "*"');
    test.equal(matchdep.filterDev('').join(), '', 'should find no dependencies with ""');
    test.done();
  },
  filterAll: function(test) {
    test.expect(2);
    test.equal(matchdep.filterAll('*').join(), 'minimatch,grunt-contrib-jshint,grunt-contrib-nodeunit,grunt,grunt-cli', 'should find all dependencies and devDependencies with "*"');
    test.equal(matchdep.filterAll('').join(), '', 'should find no dependencies with ""');
    test.done();
  },
};
