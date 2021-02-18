export function deepFind(object, property) {
  if (object === null || typeof object !== 'object') {
    throw new TypeError(`Expected object. Received ${typeof object}`);
  }

  const keys = Object.keys(object);

  if (keys.includes(property)) {
    return object[property];
  }

  for (const key of keys) {
    if (object === null || typeof object[key] !== 'object') {
      continue;
    }

    try {
      return deepFind(object[key], property);
    } catch (ignored) {}
  }

  throw new Error(`No such property: ${property}`);
}

export function deepFindAll(object, property) {
  if (object === null || typeof object !== 'object') {
    throw new TypeError(`Expected object. Received ${typeof object}`);
  }

  const result = [];
  if (property in object) {
    result.push(object[property]);
  }

  const keys = Object.keys(object);
  for (const key of keys) {
    if (object === null || typeof object[key] !== 'object') continue;

    try {
      result.push(...deepFindAll(object[key], property));
    } catch (ignored) {}
  }

  if (result.length === 0) throw new Error(`No such property: ${property}`);

  return result;
}
