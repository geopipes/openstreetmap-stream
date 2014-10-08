
var osm = require('osm-pbf-parser'),
    expander = require('./expander'),
    bun = require('stream-combiner2');

function parserFactory(){
  return bun([ osm(), expander() ]);
}

module.exports = parserFactory;