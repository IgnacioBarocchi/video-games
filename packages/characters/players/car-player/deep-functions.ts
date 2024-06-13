export function deepFunctionsToStrings(obj, functionPaths = [], path = []) {
  for (let key in obj) {
    path.push(key);
    let value = obj[key];
    if (typeof value === "object" && value !== null) {
      deepFunctionsToStrings(value, functionPaths, path);
    } else if (typeof value === "function") {
      obj[key] = value.toString();
      functionPaths.push([...path]);
    }
    path.pop();
  }
  return functionPaths;
}

export function deepStringsToFunctions(obj, functionPaths) {
  for (let functionPath of functionPaths) {
    let finalKey = functionPath.pop();
    let value = obj;
    for (let key of functionPath) {
      value = value[key];
    }
    value[finalKey] = eval(value[finalKey]);
  }
}
