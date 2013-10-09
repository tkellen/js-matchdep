'use strict';

var matchdep = require('../lib/matchdep');

exports['matchdep'] = {
  setUp: function(done) {
    this.fixture = __dirname + '/fixtures/sample.json';
    done();
  },
  filter: function(test) {
    test.expect(1);
    test.equal(matchdep.filter('*', this.fixture).join(), 'dep-1,dep-2,dep-3', 'should find all dependencies matching "*"');
    test.done();
  },
  filterDev: function(test) {
    test.expect(1);
    test.equal(matchdep.filterDev('*', this.fixture).join(), 'dev-1,dev-2,dev-3', 'should find all devDependencies matching "*"');
    test.done();
  },
  filterPeer: function(test) {
    test.expect(1);
    test.equal(matchdep.filterPeer('*', this.fixture).join(), 'peer-1,peer-2,peer-3', 'should find all peerDependencies matching "*"');
    test.done();
  },
  filterAll: function(test) {
    test.expect(1);
    test.equal(matchdep.filterAll('*', this.fixture).join(), 'dep-1,dep-2,dep-3,dev-1,dev-2,dev-3,peer-1,peer-2,peer-3', 'should find everything matching "*"');
    test.done();
  },
  'wildcard support': function(test) {
    test.expect(3);
    test.equal(matchdep.filterAll('*', this.fixture).join(), 'dep-1,dep-2,dep-3,dev-1,dev-2,dev-3,peer-1,peer-2,peer-3', 'should find everything matching "*"');
    test.equal(matchdep.filterAll('*-{1,3}', this.fixture).join(), 'dep-1,dep-3,dev-1,dev-3,peer-1,peer-3', 'should find everything matching "*-{1,3}"');
    test.equal(matchdep.filterAll('', this.fixture).join(), '', 'should find nothing, since "" matches nothing');
    test.done();
  },
  'default to package.json': function(test) {
    test.expect(1);
    test.equal(matchdep.filterAll('*').join(), 'minimatch,grunt-contrib-jshint,grunt-contrib-nodeunit,grunt,grunt-cli', 'should find all dependencies and devDependencies matching "*"');
    test.done();
  },
};
