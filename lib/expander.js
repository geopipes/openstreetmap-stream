
var through = require('through2');

function streamFactory(){

  var expander = through.obj(function( chunk, enc, next ){
    if( Array.isArray( chunk ) ){
      chunk.forEach(function( item ){
        this.push( item );
      }, this);
    } else {
      this.push( chunk );
    }
    next();
  });

  return expander;
}

module.exports = streamFactory;