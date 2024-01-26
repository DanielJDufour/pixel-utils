import type { NO_DATA_VALUE, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_one_band_pixel_to_rgb_hex(noDataValue: NO_DATA_VALUE, noDataPixel: string, scale: ScaleFunction, pixel: RawPixel): string {
  if ((pixel as Array<any>).includes(noDataValue)) return noDataPixel;
  const scaled = scale(pixel[0]).toString(16);
  return "#" + scaled + scaled + scaled;
}
