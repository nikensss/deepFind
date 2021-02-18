export default function deepFind(object, property) {
  const invalidTypes = ['number', 'boolean', 'string', 'function'];

  if (invalidTypes.includes(typeof object)) {
    throw new Error(`Received object is of invalid type: ${typeof object}`);
  }

  const keys = Object.keys(object);

  if (keys.includes(property)) {
    return object[property];
  }

  for (const key of keys) {
    if (invalidTypes.includes(typeof object[key])) {
      continue;
    }

    try {
      return deepFind(object[key], property);
    } catch (ignored) {}
  }

  throw new Error(`No such property: ${property}`);
}

export function deepFindAll(object, property) {
  const invalidTypes = ['number', 'boolean', 'string', 'function'];

  if (invalidTypes.includes(typeof object)) {
    throw new Error(`Received object is of invalid type: ${typeof object}`);
  }

  const result = [];
  const keys = Object.keys(object);

  if (keys.includes(property)) {
    result.push(object[property]);
  }

  for (const key of keys) {
    if (invalidTypes.includes(typeof object[key])) {
      continue;
    }

    try {
      result.push(...deepFindAll(object[key], property));
    } catch (ignored) {}
  }

  if (result.length === 0) {
    throw new Error(`No such property: ${property}`);
  }

  return result;
}
