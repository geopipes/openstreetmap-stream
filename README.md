## Installation

```bash
$ npm install openstreetmap-stream
```

[![NPM](https://nodei.co/npm/openstreetmap-stream.png?downloads=true&stars=true)](https://nodei.co/npm/openstreetmap-stream)

Note: you will need `node` and `npm` installed first.

The easiest way to install `node.js` is with [nave.sh](https://github.com/isaacs/nave) by executing `[sudo] ./nave.sh usemain stable`

## Usage

You can extract the openstreetmap data from a file stream:

```javascript
var osm = require('openstreetmap-stream');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland_new-zealand.osm.pbf
osm.createReadStream( 'auckland.osm.pbf' )
  .pipe( osm.stringify )
  .pipe( process.stdout );
```

## Roll your own

The easiest way to get started writing your own pipes is to use `through2`; just make sure you call `next()`.

```javascript
var osm = require('openstreetmap-stream'),
    through = require('through2');

// wget https://s3.amazonaws.com/metro-extracts.mapzen.com/auckland_new-zealand.osm.pbf
osm.createReadStream( 'auckland.osm.pbf' )
  .pipe( through.obj( function( data, enc, next ){
    console.log( data.type, data.id, data.lat, data.lon );
    next();
  }));
```

```bash
node 241968426 -16.8675316 178.8918084
node 241968427 -16.8680169 178.8950226
node 241968428 -16.8682792 178.8944902
node 241968430 -16.8678736 178.8966257
```

## Schema

Nodes:

```javascript
{
  "type": "node",
  "id": "241956126",
  "lat": -16.2484711,
  "lon": 179.5422587,
  "tags": {
    "created_by": "JOSM"
  },
  "info": {
    "version": 2,
    "timestamp": 1204332911000,
    "changeset": 237950,
    "uid": "8834",
    "user": "Jocelyn"
  }
}
```

Ways:

```javascript
{
  "type": "way",
  "id": "22572593",
  "tags": {
    "source": "PGS",
    "natural": "coastline",
    "created_by": "JOSM"
  },
  "info": {
    "version": 1,
    "timestamp": 1201026717000,
    "changeset": 680785,
    "uid": "10927",
    "user": "Skywave"
  },
  "refs": [
    "241979960",
    "241979970",
    "241979971",
    "241979972",
    "241979973",
    "241979959",
    "241979960"
  ]
}
```

## Advanced Usage

You can extract the openstreetmap data from an existing file stream:

```javascript
var osm = require('openstreetmap-stream'),
    fs = require('fs');

fs.createReadStream( './auckland_new-zealand.osm.pbf' )
  .pipe( osm.parser() )
  .pipe( osm.stringify )
  .pipe( process.stdout );
```

You can also extract the data from stdin using a unix pipe:

```javascript
var osm = require('openstreetmap-stream');

process.stdin
  .pipe( osm.parser() )
  .pipe( osm.stringify )
  .pipe( process.stdout );
```

```bash
#!/bin/bash
cat auckland_new-zealand.osm.pbf | node stdin.js;
```

## NPM Module

The `openstreetmap-stream` npm module can be found here:

[https://npmjs.org/package/openstreetmap-stream](https://npmjs.org/package/openstreetmap-stream)

## Contributing

Please fork and pull request against upstream master on a feature branch.

Pretty please; provide unit tests and script fixtures in the `test` directory.

### Running Unit Tests

```bash
$ npm test
```

### Continuous Integration

Travis tests every release against node version `0.10`

[![Build Status](https://travis-ci.org/geopipes/openstreetmap-stream.png?branch=master)](https://travis-ci.org/geopipes/openstreetmap-stream)