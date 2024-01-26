import type { NO_DATA_VALUE, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_three_band_pixel_to_rgb_hex(noDataValue: NO_DATA_VALUE, noDataPixel: string, scaleFunction1: ScaleFunction, scaleFunction2: ScaleFunction, scaleFunction3: ScaleFunction, pixel: RawPixel): string {
  if ((pixel as Array<any>).includes(noDataValue)) return noDataPixel;
  return "#" + scaleFunction1(pixel[0]).toString(16).padStart(2, "0") + scaleFunction2(pixel[1]).toString(16).padStart(2, "0") + scaleFunction3(pixel[2]).toString(16).padStart(2, "0");
}
