import { createScaleFunction } from "quick-scale";
import type { NoRangeValueStrategy } from "quick-scale";

import makeNoDataRGBA from "../make-no-data-rgba";

import convertSingle from "./convert-single";
import convertDouble from "./convert-double";
import convertDoubleAll from "./convert-double-all";
import convertMulti from "./convert-multiband";
import convertMultiAll from "./convert-multiband-all";

import type { NoDataStrategy, NoDataValue, PixelValue, Range, RawNoDataValue, RawPixel, CleanRGBA } from "../types";

export default function rawToRgba({
  ranges,
  flip = false,
  new_no_data_value,
  no_data_strategy,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value
}: {
  ranges: Range[];
  flip?: boolean;
  new_no_data_value?: NoDataValue;
  no_data_strategy?: NoDataStrategy;
  no_range_value?: PixelValue;
  no_range_value_strategy?: NoRangeValueStrategy;
  old_no_data_value?: RawNoDataValue;
}): (px: RawPixel) => CleanRGBA {
  const nbands = ranges.length;

  const new_range: Range = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];

  const options = {
    no_data_value: new_no_data_value,
    flip,
    no_range_value,
    no_range_value_strategy,
    round: true
  };

  const scalefns = ranges.slice(0, 3).map(rng => createScaleFunction(rng, new_range, options));
  if (nbands === 1) {
    return convertSingle.bind(null, old_no_data_value, makeNoDataRGBA(new_no_data_value), scalefns[0]);
  } else if (nbands === 2) {
    if (no_data_strategy === "all") {
      return convertDoubleAll.bind(null, old_no_data_value, makeNoDataRGBA(new_no_data_value), ...scalefns);
    } else {
      return convertDouble.bind(null, old_no_data_value, new_no_data_value, ...scalefns);
    }
  } else if (nbands >= 3) {
    if (no_data_strategy === "all") {
      return convertMultiAll.bind(null, old_no_data_value, makeNoDataRGBA(new_no_data_value), ...scalefns);
    } else {
      return convertMulti.bind(null, old_no_data_value, new_no_data_value, ...scalefns);
    }
  }
}
