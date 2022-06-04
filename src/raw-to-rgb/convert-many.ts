import type { NoDataPixel, NoDataValue, RawPixel, NullableRGB, ScaleFunction } from "../types";

export default function convert_raw_two_band_pixel_to_rgb(noDataValue: NoDataValue, noDataPixel: NoDataPixel, scaleFunction1: ScaleFunction, scaleFunction2: ScaleFunction, scaleFunction3: ScaleFunction, pixel: RawPixel): NullableRGB {
  pixel = pixel.slice(0, 3);
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), scaleFunction3(pixel[2])];
}
