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

## Example
Consider the following file structure (maybe used as a translation file in a webproject).
```json
{
   "MAIN": {
      "TITLE": "Main",
      "WELCOME": "Welcome Message"
    },
    "ABOUT": {
      "TITLE": "About"
    }
}
```

In most i18n implementations these translations can be used in the form `MAIN.TITLE` or `ABOUT.TITLE`. 
Using `webpack-typescript-json-type` with the above file content (giving it the name `TranslationKey`) will produce the following type: 
```typescript
declare type TranslationKey = 'MAIN.TITLE' | 'MAIN.WELCOME' | 'ABOUT.TITLE';
```

This type then allows your IDE to autocomplete translation keys if typed correctly.

## License

MIT © [Gabriel Nadler](https://github.com/Tyderion)


[npm-image]: https://badge.fury.io/js/webpack-typescript-json-type.svg
[npm-url]: https://npmjs.org/package/webpack-typescript-json-type
[travis-image]: https://travis-ci.org/Tyderion/webpack-typescript-json-type.svg?branch=master
[travis-url]: https://travis-ci.org/Tyderion/webpack-typescript-json-type
[daviddm-image]: https://david-dm.org/Tyderion/webpack-typescript-json-type.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Tyderion/webpack-typescript-json-type
