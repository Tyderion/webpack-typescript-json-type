'use strict';
var fs = require('fs');

function TranslationKeyTypeGenerator(options) {
  this.output = options.output;
  this.file = options.file;
  if (!this.output || this.output.length === 0 || !this.file || this.file.length === 0) {
    throw new Error('File and output are required configuration options');
  }
}

TranslationKeyTypeGenerator.prototype.apply = function (compiler) {
  compiler.plugin('before-compile', (compilation, cb) => {
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

    fs.readFile(this.file, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        throw err;
      }

      let translationKeyType = generateKeys(`declare type TranslationKey = `, undefined, JSON.parse(data)).replace('= |', '= ') + ';';

      fs.writeFile(this.output, translationKeyType, (err) => {
        if (err) {
          return console.log(err);
        }

        cb();
      });
    });




  });
}


// function TranslationKeyTypeGenerator(config) {
//   this.file = config.file;
//   this.output = config.output || 'typings_custom/translationkey.d.ts'
//   console.log('init: ', this.output);
//   console.log(this);
//   let a = new Test('bubu');
//   a.hello();
// }

// TranslationKeyTypeGenerator.prototype.apply = function(compiler) {
//   console.log(this);
//   throw new Error('bubu');
//   compiler.plugin('compile', (compilation) => {
//     console.log(`doing stuff '${this.output}'`);

//     // Create a header string for the generated file:
//     var filelist = `
//     export type TranslationKey = 'bubu' | 'babu';
//     `

//     fs.writeFile(this.output, filelist, function (err) {
//       if (err) {
//         return console.log(err);
//       }

//       console.log("The file was saved!");
//     });

//   });
// }


module.exports = TranslationKeyTypeGenerator;
