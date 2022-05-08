import type { NoDataPixelRGBA, NoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

export default function convert_one(old_no_data_value: NoDataValue, noDataPixel: NoDataPixelRGBA, scalefn: ScaleFunction, pixel: RawPixel): CleanRGBA {
  const n = pixel[0];
  if (n === old_no_data_value) return noDataPixel;
  const scaled = scalefn(n);
  return [scaled, scaled, scaled, 255];
}
