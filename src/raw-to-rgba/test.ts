import test from "flug";

import { Range, ScaleFunction, UINT8 } from "../types";

import range from "../range";

import convertSingle from "./convert-single";
import convertSingleStr from "./convert-single-str";
import convertDouble from "./convert-double";
import convertDoubleStr from "./convert-double-str";
import convertMultiband from "./convert-multiband";
import convertMultibandString from "./convert-multiband-str";
import rawToRgba from "./index";

const scale_uint16 = (n: number) => Math.round((n * 255) / Math.pow(2, 16));

const RANGE_U16: Range = [0, Math.pow(2, 16)];
const RANGE_U16_2X = range(2).map(() => RANGE_U16);
const RANGE_U16_5X = range(5).map(() => RANGE_U16);

test("convert one-band pixel to RGBA", ({ eq }) => {
  const fn = (pixel: [number]) => convertSingle(-99, [0, 0, 0, 0], scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511]), [95, 95, 95, 255]);
  eq(fn([-99]), [0, 0, 0, 0]);
});

test("convert one-band pixel to RGBA string", ({ eq }) => {
  const fn = (pixel: [number]) => convertSingleStr(-99, "rgba(0, 0, 0, 0)", scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511]), "rgba(95, 95, 95, 255)");
  eq(fn([-99]), "rgba(0, 0, 0, 0)");
});

test("convert two-band pixel to RGBA", ({ eq }) => {
  const fn = (pixel: [number, number]) => convertDouble(-99, 0, scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511, 2462]), [95, 10, 0, 255]);
  eq(fn([-99, 2350]), [0, 9, 0, 0]);
});

test("convert two-band pixel to RGBA String", ({ eq }) => {
  const fn = (pixel: [number, number]) => convertDoubleStr(-99, "0", scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511, 2462]), "rgba(95, 10, 0, 255)");
  eq(fn([-99, 2350]), "rgba(0, 9, 0, 0)");
});

test("convert 3+ band pixel to rgba", ({ eq }) => {
  const fn = (pixel: number[]) => convertMultiband(-99, 0, scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511, 2462, 12386]), [95, 10, 48, 255]);
  eq(fn([24511, 2462, 12386, 234, 43, 13123]), [95, 10, 48, 255]); // ignores extra bands
  eq(fn([-99, 2462, 12386]), [0, 10, 48, 0]);
  eq(fn([0, 2462, -99]), [0, 10, 0, 0]);
});

test("Convert Pixel with 3 or more bands to RGBA String", ({ eq }) => {
  const fn = (pixel: number[]) => convertMultibandString(-99, 0, scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, scale_uint16 as ScaleFunction, pixel);
  eq(fn([24511, 2462, 12386]), "rgba(95, 10, 48, 255)");
  eq(fn([24511, 2462, 12386, 234, 43, 13123]), "rgba(95, 10, 48, 255)"); // ignores extra bands
  eq(fn([-99, 2462, 12386]), "rgba(0, 10, 48, 0)");
  eq(fn([0, 2462, -99]), "rgba(0, 10, 0, 0)");
});

test("create raw to rgba processing function", ({ eq }) => {
  eq(rawToRgba({ ranges: [RANGE_U16] })([1234]), [5, 5, 5, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16] })([1234]), "rgba(5, 5, 5, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16] })([65536]), [255, 255, 255, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16] })([65536]), "rgba(255, 255, 255, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16], new_no_data_value: 255 })([65536]), [254, 254, 254, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16], new_no_data_value: 255 })([65536]), "rgba(254, 254, 254, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16], new_no_data_value: 0 })([65536]), [255, 255, 255, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16], new_no_data_value: 0 })([65536]), "rgba(255, 255, 255, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16], new_no_data_value: 0 })([0]), [1, 1, 1, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16], new_no_data_value: 0 })([0]), "rgba(1, 1, 1, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16], new_no_data_value: 255, flip: true })([0]), [254, 254, 254, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16], new_no_data_value: 255, flip: true })([0]), "rgba(254, 254, 254, 255)");
  eq(rawToRgba({ ranges: [RANGE_U16], new_no_data_value: 0, flip: true })([0]), [255, 255, 255, 255]);
  eq(rawToRgba({ format: "string", ranges: [RANGE_U16], new_no_data_value: 0, flip: true })([0]), "rgba(255, 255, 255, 255)");
  eq(rawToRgba({ ranges: RANGE_U16_5X, new_no_data_value: 0 })([1275, 2314, 4311, 52311, 542622]), [6, 10, 18, 255]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, new_no_data_value: 0 })([1275, 2314, 4311, 52311, 542622]), "rgba(6, 10, 18, 255)");
  eq(rawToRgba({ ranges: RANGE_U16_5X, old_no_data_value: 65536, new_no_data_value: 255 })([1275, 2314, 65536, 52311, 542622]), [5, 9, 255, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, old_no_data_value: 65536, new_no_data_value: 255 })([1275, 2314, 65536, 52311, 542622]), "rgba(5, 9, 255, 0)");
  eq(rawToRgba({ ranges: RANGE_U16_5X, old_no_data_value: 65536, new_no_data_value: null })([1275, 2314, 65536, 52311, 542622]), [5, 9, null, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, old_no_data_value: 65536, new_no_data_value: null })([1275, 2314, 65536, 52311, 542622]), "rgba(5, 9, null, 0)");
});

test("no data strategy", ({ eq }) => {
  const pixel = [1275, 2314, 4311, 52311, 542622];
  // default, scale some
  eq(rawToRgba({ ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0 })(pixel), [0, 10, 18, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0 })(pixel), "rgba(0, 10, 18, 0)");
  eq(rawToRgba({ ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "partial" })(pixel), [0, 10, 18, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "partial" })(pixel), "rgba(0, 10, 18, 0)");
  eq(rawToRgba({ ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "all" })(pixel), [0, 0, 0, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_5X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "all" })(pixel), "rgba(0, 0, 0, 0)");

  const two_band_pixel = [1275, 2314];
  eq(rawToRgba({ format: "array", ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0 })(two_band_pixel), [0, 10, 0, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0 })(two_band_pixel), "rgba(0, 10, 0, 0)");
  eq(rawToRgba({ ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "partial" })(two_band_pixel), [0, 10, 0, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "partial" })(two_band_pixel), "rgba(0, 10, 0, 0)");
  eq(rawToRgba({ ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "all" })(two_band_pixel), [0, 0, 0, 0]);
  eq(rawToRgba({ format: "string", ranges: RANGE_U16_2X, old_no_data_value: 1275, new_no_data_value: 0, no_data_strategy: "all" })(two_band_pixel), "rgba(0, 0, 0, 0)");
});
