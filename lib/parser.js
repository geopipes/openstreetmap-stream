
var fs = require('fs'),
    parserFactory = require('./parserFactory');

function fileParser( filepath ){

  if( !fs.existsSync( filepath ) ){
    throw new Error( 'failed to read pbf file from disk at: ' + filepath );
  }

  var parser = parserFactory();
  fs.createReadStream( filepath ).pipe( parser );

  return parser;
}

module.exports = fileParser;