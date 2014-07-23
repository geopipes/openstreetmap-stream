
var mapper = require('../lib/mapper'),
    fixtures = {
      osmread: require('./fixtures/osmread')
    }

module.exports.mapper = {};

// check the fixtures were copied correctly
module.exports.mapper.osmread_fixture = function(test, common) {
  test('check fixtures for copy->paste mistakes', function(t) {
    t.equal(fixtures.osmread.node.type, undefined, 'type not set');
    t.equal(fixtures.osmread.way.type, undefined, 'type not set');
    t.end();
  });
}

module.exports.mapper.from_osmread = function(test, common) {
  test('from osmread node format', function(t) {
    var node = fixtures.osmread.node;
    var mapped = mapper( 'node', node );
    t.equal(mapped.type, 'node', 'type set');
    t.equal(mapped.id, node.id, 'property unchanged');
    t.equal(mapped.lat, node.lat, 'property unchanged');
    t.equal(mapped.lon, node.lon, 'property unchanged');
    t.deepEqual(mapped.tags, node.tags, 'property unchanged');
    t.equal(mapped.version, undefined, 'property removed');
    t.equal(mapped.timestamp, undefined, 'property removed');
    t.equal(mapped.changeset, undefined, 'property removed');
    t.equal(mapped.uid, undefined, 'property removed');
    t.equal(mapped.user, undefined, 'property removed');
    t.equal(typeof mapped.info, 'object', 'info created');
    t.equal(mapped.info.version, node.version, 'property moved');
    t.equal(mapped.info.timestamp, node.timestamp, 'property moved');
    t.equal(mapped.info.changeset, node.changeset, 'property moved');
    t.equal(mapped.info.uid, node.uid, 'property moved');
    t.equal(mapped.info.user, node.user, 'property moved');
    var expectedProps = ['type','id','lat','lon','tags','info'];
    t.deepEqual(expectedProps, Object.keys(mapped), 'no extra properties');
    t.end();
  });
  test('from osmread way format', function(t) {
    var way = fixtures.osmread.way;
    var mapped = mapper( 'way', way );
    t.equal(mapped.type, 'way', 'type set');
    t.equal(mapped.id, way.id, 'property unchanged');
    t.deepEqual(mapped.tags, way.tags, 'property unchanged');
    t.equal(mapped.version, undefined, 'property removed');
    t.equal(mapped.timestamp, undefined, 'property removed');
    t.equal(mapped.changeset, undefined, 'property removed');
    t.equal(mapped.nodeRefs, undefined, 'property removed');
    t.equal(mapped.uid, undefined, 'property removed');
    t.equal(mapped.user, undefined, 'property removed');
    t.deepEqual(mapped.refs, way.nodeRefs, 'property moved');
    t.equal(typeof mapped.info, 'object', 'info created');
    t.equal(mapped.info.version, way.version, 'property moved');
    t.equal(mapped.info.timestamp, way.timestamp, 'property moved');
    t.equal(mapped.info.changeset, way.changeset, 'property moved');
    t.equal(mapped.info.uid, way.uid, 'property moved');
    t.equal(mapped.info.user, way.user, 'property moved');
    var expectedProps = ['type','id','lat','lon','tags','info','refs'];
    t.deepEqual(expectedProps, Object.keys(mapped), 'no extra properties');
    t.end();
  });
}

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('mapper: ' + name, testFunction)
  }

  for( var testCase in module.exports.mapper ){
    module.exports.mapper[testCase](test, common);
  }
}