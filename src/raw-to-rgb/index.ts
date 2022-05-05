import { createScaleFunction } from "quick-scale";

import type { NoRangeValueStrategy } from "quick-scale";

import makeNoDataRGB from "../make-no-data-rgb";

import convertSingle from "./convert-single";
import convertDouble from "./convert-double";
import convertTriple from "./convert-triple";
import convertMulti from "./convert-many";

import type { NoDataValue, RawPixel, PixelValue, Range, RGB } from "../types";

export default function rawToRgb({
  ranges,
  flip,
  new_no_data_value,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value,
  round = true
}: {
  ranges: Range[],
  flip?: boolean,
  new_no_data_value?: NoDataValue,
  no_range_value?: PixelValue,
  no_range_value_strategy?: NoRangeValueStrategy,
  old_no_data_value?: number,
  round?: boolean
}): (px: RawPixel) => RGB {
  const nbands = ranges.length;

  const no_data_pixel = makeNoDataRGB(new_no_data_value);

  const new_range: Range = [
    0 === new_no_data_value ? 1 : 0,
    255 === new_no_data_value ? 254 : 255
  ];

  const options = {
    no_data_value: new_no_data_value,
    flip,
    no_range_value,
    no_range_value_strategy,
    round
  };

  const scalefns = ranges.slice(0, 3).map(rng => createScaleFunction(rng, new_range, options));

  if (nbands === 1) {
    return convertSingle.bind(null, old_no_data_value, no_data_pixel, ...scalefns);
  } else if (nbands === 2) {
    return convertDouble.bind(null, old_no_data_value, no_data_pixel, ...scalefns);
  } else if (nbands === 3) {
    return convertTriple.bind(null, old_no_data_value, no_data_pixel, ...scalefns);
  } else if (nbands >= 4) {
    return convertMulti.bind(null, old_no_data_value, no_data_pixel, ...scalefns);
  }
}