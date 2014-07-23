
var fs = require('fs'),
    osmread = require('osm-read'),
    PassThrough = require('stream').PassThrough,
    mapper = require('./mapper');

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