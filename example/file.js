
var osm = require('../');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland_new-zealand.osm.pbf
osm.createReadStream( './auckland_new-zealand.osm.pbf' )
  .pipe( osm.stringify )
  .pipe( process.stdout );