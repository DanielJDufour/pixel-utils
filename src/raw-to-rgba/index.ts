import { createScaleFunction } from "quick-scale";
import type { NoRangeValueStrategy } from "quick-scale";

import noDataArray from "../make-no-data-rgba";
import noDataString from "../make-no-data-rgba-string";

import convertSingle from "./convert-single";
import convertSingleString from "./convert-single-str";
import convertDouble from "./convert-double";
import convertDoubleString from "./convert-double-str";
import convertDoubleAll from "./convert-double-all";
import convertDoubleAllString from "./convert-double-all-str";
import convertMulti from "./convert-multiband";
import convertMultiString from "./convert-multiband-str";
import convertMultiAll from "./convert-multiband-all";
import convertMultiAllString from "./convert-multiband-all-str";

import type { NO_DATA_STRATEGY, NoDataValue, UINT8, RawNoDataValue, RawPixel, CleanRGBA } from "../types";

export default function rawToRgba<F extends "array" | "string">({
  debug_level = 0,
  format = "array" as F,
  ranges,
  flip = false,
  new_no_data_value,
  no_data_strategy,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value
}: {
  debug_level?: number;
  format?: F;
  ranges: [number, number][] | Readonly<[number, number]>[] | Readonly<Readonly<[number, number]>[]>;
  flip?: boolean;
  new_no_data_value?: NoDataValue;
  no_data_strategy?: NO_DATA_STRATEGY;
  no_range_value?: UINT8;
  no_range_value_strategy?: NoRangeValueStrategy;
  old_no_data_value?: RawNoDataValue;
}): F extends "string" ? (px: RawPixel) => string : (px: RawPixel) => CleanRGBA {
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] ranges:", ranges);

  const nbands = ranges.length;

  const new_range: [number, number] = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] new_range:", new_range);

  const options = {
    no_data_value: new_no_data_value,
    flip,
    no_range_value,
    no_range_value_strategy,
    round: true
  };
  if (debug_level >= 1) console.log("[pixel-utils/raw-to-rgba] options:", options);

  const scalefns = ranges.slice(0, 3).map(rng => createScaleFunction(rng, new_range, options));
  if (nbands === 1) {
    if (format === "string") {
      // @ts-ignore
      return convertSingleString.bind(null, old_no_data_value, noDataString(new_no_data_value ?? "null"), scalefns[0]);
    } else if (format === "array") {
      // @ts-ignore
      return convertSingle.bind(null, old_no_data_value, noDataArray(new_no_data_value), scalefns[0]);
    }
  } else if (nbands === 2) {
    if (no_data_strategy === "all") {
      if (format === "string") {
        // @ts-ignore
        return convertDoubleAllString.bind(null, old_no_data_value, noDataString(new_no_data_value ?? "null"), ...scalefns);
      } else if (format === "array") {
        // @ts-ignore
        return convertDoubleAll.bind(null, old_no_data_value, noDataArray(new_no_data_value), ...scalefns);
      }
    } else {
      if (format === "string") {
        // @ts-ignore
        return convertDoubleString.bind(null, old_no_data_value, new_no_data_value ?? "null", ...scalefns);
      } else if (format === "array") {
        // @ts-ignore
        return convertDouble.bind(null, old_no_data_value, new_no_data_value, ...scalefns);
      }
    }
  } else if (nbands >= 3) {
    if (no_data_strategy === "all") {
      if (format === "string") {
        // @ts-ignore
        return convertMultiAllString.bind(null, old_no_data_value, noDataString(new_no_data_value), ...scalefns);
      } else if (format === "array") {
        // @ts-ignore
        return convertMultiAll.bind(null, old_no_data_value, noDataArray(new_no_data_value), ...scalefns);
      }
    } else {
      if (format === "string") {
        // @ts-ignore
        return convertMultiString.bind(null, old_no_data_value, new_no_data_value, ...scalefns);
      } else if (format === "array") {
        // @ts-ignore
        return convertMulti.bind(null, old_no_data_value, new_no_data_value, ...scalefns);
      }
    }
  }
  throw Error("uh oh");
}
