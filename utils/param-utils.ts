type QueryParam = string | string[] | undefined;

/**
 * Converts a query parameter to a number, removes extra values
 * @param param
 */
export function paramToNumber(param: QueryParam) {
  if (param === undefined) {
    return null;
  }
  const num = Array.isArray(param) ? parseInt(param[0]) : parseInt(param);
  return isNaN(num) ? null : num;
}

/**
 * Converts a query parameter to an array of strings
 * @param param
 */
export function paramToArray(param: QueryParam) {
  if (param === undefined) {
    return null;
  }
  return Array.isArray(param) ? param : [param];
}

/**
 * Converts a query parameter to a single string, removing extra values
 * @param param
 */
export function paramToString(param: QueryParam) {
  if (param === undefined) {
    return null;
  }
  return Array.isArray(param) ? param[0] : param;
}

/**
 * Converts query parameter to boolean, removing extra values
 * @param param
 */
export function paramToBoolean(param: QueryParam) {
  if (param === undefined) {
    return null;
  }
  const val = (Array.isArray(param) ? param[0] : param).toLowerCase();
  return val === 'true' ? true : val === 'false' ? false : null;
}
