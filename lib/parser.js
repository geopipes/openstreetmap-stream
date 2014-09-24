
var fs = require('fs'),
    osm = require('osm-pbf-parser')(),
    mapper = require('./mapper');

function parser( filepath ){

  if( !fs.existsSync( filepath ) ){
    throw new Error( 'failed to read pbf file from disk at: ' + filepath );
  }

  fs.createReadStream( filepath ).pipe( osm );

  return osm;
}

module.exports = parser;