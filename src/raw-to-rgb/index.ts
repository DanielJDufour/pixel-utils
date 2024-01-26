import { createScaleFunction } from "quick-scale";

import type { NoRangeValueStrategy } from "quick-scale";

import makeNoDataRGB from "../make-no-data-rgb";

import convertSingle from "./convert-single";
import convertSingleHex from "./convert-single-hex";
import convertSingleStr from "./convert-single-str";

import convertDouble from "./convert-double";
import convertDoubleHex from "./convert-double-hex";
import convertDoubleStr from "./convert-double-str";

import convertTriple from "./convert-triple";
import convertTripleHex from "./convert-triple-hex";
import convertTripleStr from "./convert-triple-str";

import convertMulti from "./convert-many";
import convertMultiHex from "./convert-many-hex";
import convertMultiStr from "./convert-many-str";

import rgbToHex from "../rgb-to-hex";
import rgbToStr from "../rgb-to-str";

import type { NoDataValue, NullableRGB, RawPixel, UINT8, RGB } from "../types";

export default function rawToRgb<F extends "array" | "string" | "hex">({
  format = "array" as F,
  ranges,
  flip,
  new_no_data_pixel,
  new_no_data_value,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value,
  round = true
}: {
  format?: F;
  ranges: [number, number][] | Readonly<[number, number]>[] | Readonly<Readonly<[number, number]>[]>;
  flip?: boolean;
  new_no_data_pixel?: NullableRGB;
  new_no_data_value?: NoDataValue;
  no_range_value?: UINT8;
  no_range_value_strategy?: NoRangeValueStrategy;
  old_no_data_value?: number;
  round?: F extends "hex" ? undefined | true : boolean;
}): F extends "string" ? (px: RawPixel) => string : F extends "hex" ? (px: RawPixel) => string : (px: RawPixel) => RGB {
  const nbands = ranges.length;

  if (new_no_data_pixel && new_no_data_value) {
    throw new Error("[pixel-utils/raw-to-rgb] can't specify both new_no_data_pixel and new_no_data_value");
  }

  if (new_no_data_pixel === undefined || new_no_data_pixel === null) {
    if (new_no_data_value === undefined || new_no_data_value === null) {
      new_no_data_pixel = makeNoDataRGB(null);
    } else {
      new_no_data_pixel = makeNoDataRGB(new_no_data_value);
    }
  }

  if (new_no_data_pixel === undefined) throw new Error("[pixel-utils/raw-to-rgb] undefined new_no_data_pixel");

  const new_range: [number, number] = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];

  if (format === "hex" && round === false) {
    throw new Error("[pixel-utils/raw-to-rgb] format is hex, but round is false");
  }

  const options = {
    flip,
    no_range_value,
    no_range_value_strategy,
    round
  };

  const scalefns = ranges.slice(0, 3).map(rng => createScaleFunction(rng, new_range, options));

  if (nbands === 1) {
    if (format === "string") {
      // @ts-ignore
      return convertSingleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else if (format === "hex") {
      // @ts-ignore
      return convertSingleHex.bind(null, old_no_data_value, rgbToHex(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertSingle.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 2) {
    if (format === "string") {
      // @ts-ignore
      return convertDoubleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else if (format === "hex") {
      // @ts-ignore
      return convertDoubleHex.bind(null, old_no_data_value, rgbToHex(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertDouble.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 3) {
    if (format === "string") {
      // @ts-ignore
      return convertTripleStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else if (format === "hex") {
      // @ts-ignore
      return convertTripleHex.bind(null, old_no_data_value, rgbToHex(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertTriple.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands >= 4) {
    if (format === "string") {
      // @ts-ignore
      return convertMultiStr.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel as any), ...scalefns);
    } else if (format === "hex") {
      // @ts-ignore
      return convertMultiHex.bind(null, old_no_data_value, rgbToHex(new_no_data_pixel as any), ...scalefns);
    } else {
      // @ts-ignore
      return convertMulti.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else {
    throw new Error("[pixel-utils/raw-to-rgb] invalid number of bands: " + nbands);
  }
}
