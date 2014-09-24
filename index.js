
module.exports = {
  createReadStream: require('./lib/parser'),
  parser: require('osm-pbf-parser'),
  stringify: require('./lib/stringify')
};