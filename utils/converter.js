// utils/caseConverter.js
import _ from 'lodash';

// This is a smart recursive function. It handles nested objects and arrays automatically.
const convertKeys = (obj, converter) => {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeys(v, converter));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      // For each key in the object, convert it and its value
      acc[converter(key)] = convertKeys(obj[key], converter);
      return acc;
    }, {});
  }
  // If it's not an object or array, return it as is
  return obj;
};

// EXPORT 1: Takes a snake_case object -> returns a camelCase object
export const toCamel = (obj) => {
  return convertKeys(obj, _.camelCase);
};

// EXPORT 2: Takes a camelCase object -> returns a snake_case object
export const toSnake = (obj) => {
  return convertKeys(obj, _.snakeCase);
};