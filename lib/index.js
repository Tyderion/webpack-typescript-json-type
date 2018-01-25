'use strict';
var fs = require('fs');
var path = require('path');

function TranslationKeyTypeGenerator(options) {
  this.output = options.output;
  this.classname = options.classname || 'TranslationKey';
  this.outputfile = path.resolve(this.output, `jsontypes.d.ts`);
  if (options.files) {
    this.files = options.files;
  } else {
    this.file = options.file;
  }

  console.log(this.files);
  // if (!this.output || this.output.length === 0 || !this.file || this.file.length === 0) {
  //   throw new Error('File and output are required configuration options');
  // }
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
function appendFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, content, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
function createScope(scope, subscope) {
  // console.log('scope: ', scope, 'subscope: ', subscope);
  if (!scope || scope.length === 0) {
    return subscope;
  }
  return `${scope}.${subscope}`;
}

function generateKeys(type, scope, json) {
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      const currentScope = createScope(scope, key);
      if (typeof json[key] === 'string') {
        type = `${type} | '${currentScope}'`;
      } else if (typeof json[key] === 'object') {
        type = generateKeys(type, currentScope, json[key]);
      }
    }
  }
  return type;
}

function generate(config, outputfile) {
  return readFile(config.path).then(content => {
    let translationKeyType = generateKeys(`declare type ${config.class} = `, undefined, JSON.parse(content)).replace('= |', '= ') + ';\n';
    return appendFile(outputfile, '\n' + translationKeyType);
  })
}

TranslationKeyTypeGenerator.prototype.apply = function (compiler) {
  compiler.plugin('before-compile', async (compilation, cb) => {
    try {
      await writeFile(this.outputfile, '');
      if (this.files) {
        await Promise.all(this.files.map(file => generate(file, this.outputfile)));
      } else {
        await generate(this.file, this.outputfile);
      }
      cb();
    } catch (err) {
      console.error('error while writing: ', err);
    }

  });
}

module.exports = TranslationKeyTypeGenerator;
