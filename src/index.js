export function deepFind(object, property, depth = Number.POSITIVE_INFINITY) {
  if (object === null || typeof object !== 'object') {
    throw new TypeError(`Expected object. Received ${typeof object}`);
  }

  if (depth < 0) throw new Error(`No such property: ${property}`);

  if (property in object) return object[property];

  if (depth === 0) throw new Error(`No such property: ${property}`);

  const keys = Object.keys(object);
  for (const key of keys) {
    if (object === null || typeof object[key] !== 'object') continue;

    try {
      return deepFind(object[key], property, depth - 1);
    } catch (ignored) {}
  }

  throw new Error(`No such property: ${property}`);
}

export function deepFindAll(object, property) {
  if (object === null || typeof object !== 'object') {
    throw new TypeError(`Expected object. Received ${typeof object}`);
  }

  const result = [];

  if (property in object) result.push(object[property]);

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
