
var osm = require('../'),
    fs = require('fs');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland_new-zealand.osm.pbf
fs.createReadStream( './auckland_new-zealand.osm.pbf' )
  .pipe( osm.parser() )
  .pipe( osm.stringify )
  .pipe( process.stdout );