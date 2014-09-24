
var osm = require('../');

module.exports.interface = {};

module.exports.interface.createReadStream = function(test, common) {
  test('createReadStream()', function(t) {
    t.equal(typeof osm.createReadStream, 'function', 'valid function');
    t.equal(osm.createReadStream.length, 1, 'consistent arguments length');
    t.end();
  });
};

module.exports.interface.stringify = function(test, common) {
  test('stringify()', function(t) {
    t.equal(typeof osm.stringify, 'object', 'valid stream');
    t.equal(typeof osm.stringify._read, 'function', 'readable stream');
    t.equal(typeof osm.stringify._write, 'function', 'writable stream');
    t.end();
  });
};

module.exports.interface.parser = function(test, common) {
  test('parser()', function(t) {
    t.equal(typeof osm.parser, 'function', 'valid function');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('external interface: ' + name, testFunction)
  }

  for( var testCase in module.exports.interface ){
    module.exports.interface[testCase](test, common);
  }
};