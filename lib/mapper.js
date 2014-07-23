
// map osm-read format to osm-pbf-parser format
// beacuse it's clearer and easier to parse
var mapper = function( type, item ){
  var obj = {
    type: type,
    id: item.id,
    lat: item.lat,
    lon: item.lon,
    tags: {},
    info: {}
  };
  if( item.tags ) obj.tags = item.tags;
  if( item.members ) obj.members = item.members;
  if( item.refs ) obj.refs = item.refs;
  else if( item.nodeRefs ) obj.refs = item.nodeRefs;
  for( var attr in item ){
    if( 'nodeRefs' !== attr && !obj.hasOwnProperty( attr ) ){
      obj.info[ attr ] = item[ attr ];
    }
  }
  return obj;
}

module.exports = mapper;