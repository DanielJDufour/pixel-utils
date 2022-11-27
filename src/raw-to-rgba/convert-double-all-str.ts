import type { NO_DATA_VALUE, ScaleFunction } from "../types";

// convert a 2-band pixel
// if any no data is found, set all RGB to no data
export default function convert_double_all_string(old_no_data_value: NO_DATA_VALUE, noDataPixel: string, scalefn1: ScaleFunction, scalefn2: ScaleFunction, pixel: [number, number] | Readonly<[number, number]>): string {
  if ((pixel as Array<any>).includes(old_no_data_value)) return noDataPixel;
  return `rgba(${scalefn1(pixel[0])},${scalefn2(pixel[1])},0,255)`;
}
