
module.exports = {
  createReadStream: require('./lib/parser'),
  parser: require('./lib/parserFactory'),
  stringify: require('./lib/stringify')
};