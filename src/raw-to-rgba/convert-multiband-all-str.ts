import type { NO_DATA_VALUE, RawPixel, ScaleFunction } from "../types";

export default function convert_multiband_all_to_string(old_no_data_value: NO_DATA_VALUE, noDataPixel: string, scalefn1: ScaleFunction, scalefn2: ScaleFunction, scalefn3: ScaleFunction, pixel: RawPixel): string {
  if ((pixel as Array<any>).includes(old_no_data_value)) return noDataPixel;
  return `rgba(${scalefn1(pixel[0])}, ${scalefn2(pixel[1])}, ${scalefn3(pixel[2])}, 255)`;
}
