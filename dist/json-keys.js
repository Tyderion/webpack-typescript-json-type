"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createScope(subscope, scope) {
    if (!scope || scope.length === 0) {
        return subscope;
    }
    return scope + "." + subscope;
}
function generateKeys(json, scope) {
    var keys = [];
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            var currentScope = createScope(key, scope);
            if (typeof json[key] === 'string') {
                keys.push(currentScope);
            }
            else if (typeof json[key] === 'object') {
                keys.push.apply(keys, generateKeys(json[key], currentScope));
            }
        }
    }
    return keys;
}
exports.generateKeys = generateKeys;
