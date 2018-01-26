'use strict';
import { Compiler } from './webpack';
import { writeFile, appendFile, readFile } from './fs';
import { generateKeys } from './json-keys';
import * as path from 'path';

interface IOptions {
  output: string;
  outputfile: string;
  files: IFileDef[];
  typefile?: string;
}

interface IFileDef {
  path: string;
  class: string
}

class TranslationKeyTypeGenerator {
  private outputFolder: string;
  private outputFile: string;
  private files: IFileDef[];

  public constructor(options: IOptions) {
    this.outputFolder = options.output;
    this.outputFile = path.resolve(this.outputFolder, options.typefile || `jsontypes.d.ts`);
    this.files = options.files;
  }

  private async generate(config: IFileDef): Promise<string> {
    const content = await readFile(config.path);
    let allKeys = generateKeys(JSON.parse(content));
    let translationKeyType = `declare type ${config.class} = ${allKeys.map(s => `'${s}'`).join(' | ')}`;
    return translationKeyType;
  }

  public apply(compiler: Compiler) {
    compiler.plugin('before-compile', async (compilation, cb) => {
      console.log(compilation);
      try {
        const content: string = (await Promise.all(this.files.map(file => this.generate(file)))).join('\n');
        const oldContent = await readFile(this.outputFile);
        if (content !== oldContent) {
          await writeFile(this.outputFile, content);
        }
        cb();
      } catch (err) {
        console.error('error while writing: ', err);
      }

    });
  }
}

export = TranslationKeyTypeGenerator;
