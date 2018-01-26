
function createScope(subscope: string, scope?: string): string {
  if (!scope || scope.length === 0) {
    return subscope;
  }
  return `${scope}.${subscope}`;
}

export function generateKeys(json: Object, scope?: string): string[] {
  const keys: string[] = [];
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      const currentScope = createScope(key, scope);
      if (typeof json[key] === 'string') {
        keys.push(currentScope);
      } else if (typeof json[key] === 'object') {
        keys.push(...generateKeys(json[key], currentScope));
      }
    }
  }
  return keys;
}
