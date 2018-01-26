"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
exports.readFile = readFile;
function appendFile(path, content) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(path, content, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
exports.appendFile = appendFile;
function writeFile(path, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
exports.writeFile = writeFile;
