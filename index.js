
var osm = require('osm-pbf-parser'),
    expander = require('./lib/expander'),
    bun = require('stream-combiner2');

module.exports = {
  createReadStream: require('./lib/parser'),
  parser: function(){ return bun([ osm(), expander() ]); },
  stringify: require('./lib/stringify')
};