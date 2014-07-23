
var osm = require('../');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland.osm.pbf
osm.createReadStream( 'auckland.osm.pbf' )
  .pipe( osm.stringify )
  .pipe( process.stdout );