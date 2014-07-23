
var osm = require('../');

// wget http://download.geofabrik.de/australia-oceania/fiji-latest.osm.pbf
osm.createReadStream( 'fiji-latest.osm.pbf' )
  .pipe( osm.stringify )
  .pipe( process.stdout );