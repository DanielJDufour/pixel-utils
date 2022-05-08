import type { NoDataPixelRGBA, NoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

export default function convert_multiband_all(old_no_data_value: NoDataValue, noDataPixel: NoDataPixelRGBA, scalefn1: ScaleFunction, scalefn2: ScaleFunction, scalefn3: ScaleFunction, pixel: RawPixel): CleanRGBA {
  if (pixel.includes(old_no_data_value)) return noDataPixel;
  return [scalefn1(pixel[0]), scalefn2(pixel[1]), scalefn3(pixel[2]), 255];
}
