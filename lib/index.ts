'use strict';
import { writeFile, appendFile, readFile } from './fs';
import { generateKeys } from './json-keys';
import * as path from 'path';

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

function generate(config, outputfile) {
  return readFile(config.path).then(content => {
    let allKeys = generateKeys(JSON.parse(content));
    let translationKeyType = `declare type ${config.class} = ${allKeys.map(s =>`'${s}'`).join(' | ')}\n`;
    return appendFile(outputfile, '\n' + translationKeyType);
  })
}

TranslationKeyTypeGenerator.prototype.apply = function (compiler) {
  compiler.plugin('before-compile', async (compilation, cb) => {
    console.log(compilation);
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
