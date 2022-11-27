import type { RawNoDataValue, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_two_band_pixel_to_rgba_string(old_no_data_value: RawNoDataValue, new_no_data_value: string, scalefn1: ScaleFunction, scalefn2: ScaleFunction, pixel: RawPixel): string {
  const [r, g] = pixel;
  return `rgba(${r === old_no_data_value ? new_no_data_value : scalefn1(r)}, ${g === old_no_data_value ? new_no_data_value : scalefn2(g)}, 0, ${r === old_no_data_value || g === old_no_data_value ? 0 : 255})`;
}
