
var osm = require('../');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland_new-zealand.osm.pbf
process.stdin
  .pipe( osm.parser() )
  .pipe( osm.stringify )
  .pipe( process.stdout );