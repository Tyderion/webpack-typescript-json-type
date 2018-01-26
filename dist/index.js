'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = require("./fs");
var json_keys_1 = require("./json-keys");
var path = require("path");
function TranslationKeyTypeGenerator(options) {
    this.output = options.output;
    this.classname = options.classname || 'TranslationKey';
    this.outputfile = path.resolve(this.output, "jsontypes.d.ts");
    if (options.files) {
        this.files = options.files;
    }
    else {
        this.file = options.file;
    }
    console.log(this.files);
    // if (!this.output || this.output.length === 0 || !this.file || this.file.length === 0) {
    //   throw new Error('File and output are required configuration options');
    // }
}
function generate(config, outputfile) {
    return fs_1.readFile(config.path).then(function (content) {
        var allKeys = json_keys_1.generateKeys(JSON.parse(content));
        var translationKeyType = "declare type " + config.class + " = " + allKeys.map(function (s) { return "'" + s + "'"; }).join(' | ') + "\n";
        return fs_1.appendFile(outputfile, '\n' + translationKeyType);
    });
}
TranslationKeyTypeGenerator.prototype.apply = function (compiler) {
    var _this = this;
    compiler.plugin('before-compile', function (compilation, cb) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(compilation);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fs_1.writeFile(this.outputfile, '')];
                case 2:
                    _a.sent();
                    if (!this.files) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all(this.files.map(function (file) { return generate(file, _this.outputfile); }))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, generate(this.file, this.outputfile)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    cb();
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error('error while writing: ', err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
};
module.exports = TranslationKeyTypeGenerator;
