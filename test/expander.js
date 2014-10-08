
var expander = require('../lib/expander'),
    through = require('through2');

module.exports.tests = {};

module.exports.tests.interface = function(test, common) {
  test('interface', function(t) {
    t.equal(typeof expander, 'function', 'stream factory');
    t.end();
  });
  test('generates stream', function(t) {
    var stream = expander();
    t.equal(typeof stream, 'object', 'valid stream');
    t.equal(typeof stream._read, 'function', 'readable stream');
    t.equal(typeof stream._write, 'function', 'writable stream');
    t.end();
  });
};

module.exports.tests.expander_array = function(test, common) {
  test('Array of Values', function(t) {

    t.plan(3); // t.end will be called automatically after x asserts
    var ord = 0;
    var assertStream = through.obj( function( chunk, enc, next ){
      if(ord===0){ t.equal( chunk, 'foo' ); }
      if(ord===1){ t.equal( chunk, 'bar' ); }
      if(ord===2){ t.equal( chunk, 'baz' ); }
      ord++;
      next();
    });

    var s = expander();
    s.pipe(assertStream);
    s.write([ 'foo', 'bar', 'baz' ]);

  });
};

module.exports.tests.expander_single = function(test, common) {
  test('Single Value', function(t) {

    t.plan(3); // t.end will be called automatically after x asserts
    var ord = 0;
    var assertStream = through.obj( function( chunk, enc, next ){
      if(ord===0){ t.equal( chunk, 'foo' ); }
      if(ord===1){ t.equal( chunk, 'bar' ); }
      if(ord===2){ t.equal( chunk, 'baz' ); }
      ord++;
      next();
    });

    var s = expander();
    s.pipe(assertStream);
    s.write( 'foo' );
    s.write( 'bar' );
    s.write( 'baz' );

  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('expander ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};