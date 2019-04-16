# NodeJS API Generator [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generator for NodeJS API&#39;s (NoSQL, SQL, Auth, etc...)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-node-js-api using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-node-javascript-api
```

Then generate your new project:

```bash
yo node-javascript-api
```

or

```bash
yo
```

to list all generators.

## Usage for the API

### Developement

```bash
npm install
npm run start
```

### Production

```bash
npm install
npm run build
sh ./build.sh
docker-compose up 
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Mike Nußbaumer]()


[npm-image]: https://badge.fury.io/js/generator-node-js-api.svg
[npm-url]: https://npmjs.org/package/generator-node-js-api
[travis-image]: https://travis-ci.org/mikenussbaumer/generator-node-js-api.svg?branch=master
[travis-url]: https://travis-ci.org/mikenussbaumer/generator-node-js-api
[daviddm-image]: https://david-dm.org/mikenussbaumer/generator-node-js-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mikenussbaumer/generator-node-js-api
