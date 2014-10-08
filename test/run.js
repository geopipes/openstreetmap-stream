
var tape = require('tape');

var common = {};

var tests = [
  require('./interface.js'),
  require('./mapper.js'),
  require('./expander.js')
];

tests.map(function(t) {
  t.all(tape, common);
});