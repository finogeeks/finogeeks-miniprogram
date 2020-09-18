const TYPES = {
  array: '[object Array]',
  function: '[object Function]',
  number: '[object Number]',
  object: '[object Object]',
  string: '[object String]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  boolean: '[object Boolean]',
};

function getType(val) {
  return Object.prototype.toString.call(val);
}

function isObject(val) {
  return getType(val) === TYPES.object;
}

function isArray(val) {
  return getType(val) === TYPES.array;
}

function isFunction(val) {
  return getType(val) === TYPES.function;
}

function isString(val) {
  return getType(val) === TYPES.string;
}

export { TYPES, getType, isArray, isFunction, isObject, isString };
