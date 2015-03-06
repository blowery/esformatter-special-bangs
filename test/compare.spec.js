//jshint node:true, eqnull:true
/*global describe, it, before*/
'use strict';
var fs = require('fs');
var path = require('path');
var esformatter = require('esformatter');
var specialBangs = require('../');
var expect = require('chai').expect;

var readFile = function(folder, name) {
  var filePath = path.join('./test', folder, name);
  return fs.readFileSync(filePath).toString();
};

describe('esformatter-special-bangs', function() {
  before(function() {
    esformatter.register(specialBangs);
  });

  describe('should add a space around exclamation points', function() {
    var files = fs.readdirSync('./test/fixtures/');
    files.forEach(function(file) {
      it('should transform fixture ' + file + ' and be equal expected file', function() {
        var input = readFile('fixtures', file);
        var actual = esformatter.format(input);
        var expected = readFile('expected', file);
        expect(actual).to.equal(expected, 'file comparison failed: ' + file);
      });
    });
  });

});