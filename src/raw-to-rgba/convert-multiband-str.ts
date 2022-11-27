import type { RawNoDataValue, NoDataValue, RawPixel, ScaleFunction } from "../types";

export default function convert_raw_multiband_to_rgba_string(old_no_data_value: RawNoDataValue, new_no_data_value: NoDataValue, scalefn1: ScaleFunction, scalefn2: ScaleFunction, scalefn3: ScaleFunction, pixel: RawPixel): string {
  const [r, g, b] = pixel;
  return `rgba(${r === old_no_data_value ? new_no_data_value : scalefn1(r)}, ${g === old_no_data_value ? new_no_data_value : scalefn2(g)}, ${b === old_no_data_value ? new_no_data_value : scalefn3(b)}, ${
    r === old_no_data_value || g === old_no_data_value || b === old_no_data_value ? "0" : "255"
  })`;
}
