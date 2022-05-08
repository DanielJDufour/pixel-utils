import type { NoDataPixelRGBA, RawNoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

// convert a 2-band pixel
// if any no data is found, set all RGB to no data
export default function convert_double_all(old_no_data_value: RawNoDataValue, noDataPixel: NoDataPixelRGBA, scalefn1: ScaleFunction, scalefn2: ScaleFunction, pixel: RawPixel): CleanRGBA {
  if (pixel.includes(old_no_data_value)) return noDataPixel;
  return [scalefn1(pixel[0]), scalefn2(pixel[1]), 0, 255];
}
