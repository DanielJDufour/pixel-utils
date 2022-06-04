import type { NoDataPixel, NoDataValue, RawPixel, NullableRGB, ScaleFunction } from "../types";

export default function convert_raw_one_band_pixel_to_rgb(noDataValue: NoDataValue, noDataPixel: NoDataPixel, scale: ScaleFunction, pixel: RawPixel): NullableRGB {
  if (pixel.includes(noDataValue)) return noDataPixel;
  const scaled = scale(pixel[0]);
  return [scaled, scaled, scaled];
}
