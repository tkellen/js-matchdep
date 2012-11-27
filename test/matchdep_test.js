'use strict';

var matchdep = require('../lib/matchdep');

exports['matchdep'] = {
  setUp: function(done) {
    this.pkg = require('../package.json');
    done();
  },
  filter: function(test) {
    test.expect(2);
    test.equal(matchdep.filter(this.pkg,'*').join(), 'minimatch', 'should find all dependencies with "*"');
    test.equal(matchdep.filter(this.pkg,'').join(), '', 'should find no dependencies with ""');
    test.done();
  },
  filterDev: function(test) {
    test.expect(2);
    test.equal(matchdep.filterDev(this.pkg,'*').join(), 'grunt-contrib-jshint,grunt-contrib-nodeunit,grunt,grunt-cli', 'should find all devDependencies with "*"');
    test.equal(matchdep.filterDev(this.pkg,'').join(), '', 'should find no dependencies with ""');
    test.done();
  },
  filterAll: function(test) {
    test.expect(2);
    test.equal(matchdep.filterAll(this.pkg,'*').join(), 'minimatch,grunt-contrib-jshint,grunt-contrib-nodeunit,grunt,grunt-cli', 'should find all dependencies and devDependencies with "*"');
    test.equal(matchdep.filterAll(this.pkg,'').join(), '', 'should find no dependencies with ""');
    test.done();
  },
};
