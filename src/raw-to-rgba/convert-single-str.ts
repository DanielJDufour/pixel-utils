import type { RawNoDataValue, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_one_band_pixel_to_rgba_string(old_no_data_value: RawNoDataValue, noDataPixel: string, scalefn: ScaleFunction, pixel: RawPixel): string {
  const n = pixel[0];
  if (n === old_no_data_value) return noDataPixel;
  const scaled = scalefn(n);
  return `rgba(${scaled}, ${scaled}, ${scaled}, 255)`;
}
