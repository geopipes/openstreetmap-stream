
var fs = require('fs'),
    osmread = require('osm-read'),
    PassThrough = require('stream').PassThrough;

// map osm-read format to osm-pbf-parser format
// beacuse it's clearer and easier to parse
var mapper = function( type, item ){
  var obj = {
    type: type,
    id: item.id,
    lat: item.lat,
    lon: item.lon,
    tags: {},
    info: {}
  };
  if( item.tags ) obj.tags = item.tags;
  if( item.members ) obj.members = item.members;
  if( item.refs ) obj.refs = item.refs;
  else if( item.nodeRefs ){
    obj.refs = item.nodeRefs;
    delete item.nodeRefs;
  }
  for( var attr in item ){
    if( !obj.hasOwnProperty( attr ) ){
      obj.info[ attr ] = item[ attr ];
    }
  }
  return obj;
}

function parser( filepath ){

  if( !fs.existsSync( filepath ) ){
    throw new Error( 'failed to read pbf file from disk at: ' + filepath );
  }

  var stream = new PassThrough({ objectMode: true });

  osmread.parse({
    filePath: filepath,
    endDocument: function(){
      stream.close();
    },
    bounds: function( item, next ){
      stream.write( mapper('bounds', item ), 'utf8', next );
    },
    node: function( item, next ){
      stream.write( mapper('node', item ), 'utf8', next );
    },
    way: function( item, next ){
      stream.write( mapper('way', item ), 'utf8', next );
    },
    relation: function( item, next ){
      stream.write( mapper('relation', item ), 'utf8', next );
    },
    error: function( msg ){
      console.error( msg );
    }
  });

  return stream;
}

module.exports = parser;