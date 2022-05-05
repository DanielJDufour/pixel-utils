import type { NoDataValue, RawNoDataValue, RawPixel, CleanRGBA, ScaleFunction } from "../types";

export default function convert_double (
  old_no_data_value: RawNoDataValue,
  new_no_data_value: NoDataValue, 
  scalefn1: ScaleFunction,
  scalefn2: ScaleFunction,
  pixel: RawPixel
): CleanRGBA {
  const [r, g] = pixel;
  return [
    r === old_no_data_value ? new_no_data_value : scalefn1(r),
    g === old_no_data_value ? new_no_data_value : scalefn2(g),
    0,
    r === old_no_data_value || g === old_no_data_value ? 0 : 255
  ];
}