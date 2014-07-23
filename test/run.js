
var tape = require('tape');

var common = {};

var tests = [
  require('./mapper.js')
];

tests.map(function(t) {
  t.all(tape, common)
});