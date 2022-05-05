/**
 * @description checks if the given raw pixel has a no-data band values
 * @param nodata
 * @param pixel 
 * @returns {boolean}
 */
export default function hasNoData(noDataValue, pixel) {
  return pixel.includes(noDataValue);
}