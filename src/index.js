function isValidObject(o) {
  return o !== null && typeof o === 'object';
}

/**
 * Returns the least nested property with the name 'property' in 'object'.
 *
 * @param {object} object The object to navigate
 * @param {string} property The name of the property to find
 * @param {number} depth How many layers deep to navigate before stopping the search
 */
export function deepFind(object, property, depth = Number.POSITIVE_INFINITY) {
  return deepFindAll(object, property, depth).shift();
}

/**
 * Returns an array with the values of all the properties with the name
 * 'property' inside the given object, an inside the objects in it.
 *
 * @param {object} object The object to navigate
 * @param {string} property The name of the property to find
 * @param {number} depth How many layers deep to navigate before stopping the search
 */
export function deepFindAll(
  object,
  property,
  depth = Number.POSITIVE_INFINITY
) {
  if (typeof property !== 'string') {
    throw new TypeError('Type of property must be a string');
  }

  if (typeof depth !== 'number') {
    throw new TypeError('Type of depth must be number');
  }

  if (!isValidObject(object)) {
    throw new TypeError(`Expected object. Received ${typeof object}`);
  }

  const result = [];

  if (depth < 0) return result;

  if (property in object) result.push(object[property]);

  for (const key of Object.keys(object)) {
    try {
      result.push(...deepFindAll(object[key], property, depth - 1));
    } catch (ignored) {}
  }

  return result;
}
