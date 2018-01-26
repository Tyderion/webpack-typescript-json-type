# webpack-typescript-json-type [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generates a type with all json paths for the configured files

## Installation

```sh
$ npm install --save-dev webpack-typescript-json-type
```

## Usage

```js
const path = require('path');
const TranslationKeyTypeGenerator = require('webpack-typescript-json-type');
```
then use it in the plugins section of your config: 
```js
{
  plugins: [
    new TranslationKeyTypeGenerator({ 
      files: [
        { path: path.resolve(__dirname, './path/to/your/json.json'), class: 'SomeTypeName' },
        { path: path.resolve(__dirname, './path/to/your/different.json.json'), class: 'ADifferentTypeName' },
      ], 
      output: path.resolve(__dirname, 'typings_custom'),
      typefile: 'optional.d.ts' // Defaults to jsontypes.d.ts
    })
}
```

This will produce to ambient types `SomeTypeName` and `ADifferentTypeName` in the specified file.
Then you just need to include the type definition file with a reference path and you're good to go `/// <reference path="path/to/jsontypes.d.ts"/>` or include it differently.

## License

MIT © [Gabriel Nadler]()


[npm-image]: https://badge.fury.io/js/webpack-typescript-json-type.svg
[npm-url]: https://npmjs.org/package/webpack-typescript-json-type
[travis-image]: https://travis-ci.org/Tyderion/webpack-typescript-json-type.svg?branch=master
[travis-url]: https://travis-ci.org/Tyderion/webpack-typescript-json-type
[daviddm-image]: https://david-dm.org/Tyderion/webpack-typescript-json-type.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Tyderion/webpack-typescript-json-type
