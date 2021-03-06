'use strict';
var tslib_1 = require("tslib");
var fs_1 = require("./fs");
var json_keys_1 = require("./json-keys");
var path = require("path");
var TranslationKeyTypeGenerator = /** @class */ (function () {
    function TranslationKeyTypeGenerator(options) {
        this.outputFolder = options.output;
        this.outputFile = path.resolve(this.outputFolder, options.typefile || "jsontypes.d.ts");
        this.files = options.files;
    }
    TranslationKeyTypeGenerator.prototype.generate = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var content, allKeys, translationKeyType;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.readFile(config.path)];
                    case 1:
                        content = _a.sent();
                        allKeys = json_keys_1.generateKeys(JSON.parse(content));
                        translationKeyType = "declare type " + config.class + " = " + allKeys.map(function (s) { return "'" + s + "'"; }).join(' | ');
                        return [2 /*return*/, translationKeyType];
                }
            });
        });
    };
    TranslationKeyTypeGenerator.prototype.apply = function (compiler) {
        var _this = this;
        compiler.plugin('before-compile', function (compilation, cb) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var content, oldContent, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, Promise.all(this.files.map(function (file) { return _this.generate(file); }))];
                    case 1:
                        content = (_a.sent()).join('\n');
                        return [4 /*yield*/, fs_1.readFile(this.outputFile)];
                    case 2:
                        oldContent = _a.sent();
                        if (!(content !== oldContent)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_1.writeFile(this.outputFile, content)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        cb();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error('error while writing: ', err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    return TranslationKeyTypeGenerator;
}());
module.exports = TranslationKeyTypeGenerator;
