import test from "flug";

import convert_raw_one_band_pixel_to_rgb from "./convert-single";
import convert_raw_two_band_pixel_to_rgb from "./convert-double";
import convert_raw_three_band_pixel_to_rgb from "./convert-triple";
import convert_raw_many_band_pixel_to_rgb from "./convert-many";
import rawToRgb from "./index";

const scale_uint16 = (n: number) => Math.round((n * 255) / Math.pow(2, 16));

test("convert_one_band_pixel_to_rgb", ({ eq }) => {
  // @ts-ignore
  const fn = convert_raw_one_band_pixel_to_rgb.bind(null, -99, [0, 0, 0], scale_uint16);
  eq(fn([24511]), [95, 95, 95]);
  eq(fn([-99]), [0, 0, 0]);
});

test("convert_two_band_pixel_to_rgb", ({ eq }) => {
  // @ts-ignore
  const fn = convert_raw_two_band_pixel_to_rgb.bind(null, -99, [0, 0, 0], scale_uint16, scale_uint16);
  eq(fn([24511, 2462]), [95, 10, 0]);
  eq(fn([-99]), [0, 0, 0]);
});

test("convert_three_band_pixel_to_rgb", ({ eq }) => {
  // @ts-ignore
  const fn = convert_raw_three_band_pixel_to_rgb.bind(null, -99, [0, 0, 0], scale_uint16, scale_uint16, scale_uint16);
  eq(fn([24511, 2462, 12386]), [95, 10, 48]);
  eq(fn([-99, 2462, 12386]), [0, 0, 0]);
  eq(fn([0, 2462, -99]), [0, 0, 0]);
});

test("convert_many_band_pixel_to_rgb", ({ eq }) => {
  // @ts-ignore
  const fn = convert_raw_many_band_pixel_to_rgb.bind(null, -99, [0, 0, 0], scale_uint16, scale_uint16, scale_uint16);
  eq(fn([24511, 2462, 12386, 24511, 2462, 12386]), [95, 10, 48]);
  eq(fn([-99, 2462, 12386, 24511, 2462, 12386]), [0, 0, 0]);
  eq(fn([0, 2462, -99, 24511, 2462, 12386]), [0, 0, 0]);
});

test("create_raw_to_rgb", ({ eq }) => {
  eq(rawToRgb({ ranges: [[0, 65536]] })([65536]), [255, 255, 255]);
  eq(rawToRgb({ ranges: [[0, 65536]], old_no_data_value: 0 })([65536]), [255, 255, 255]);
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_value: 255 })([65536]), [254, 254, 254]);
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_value: 0 })([0]), [1, 1, 1]);
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [0, 65536],
        [0, 65536]
      ],
      new_no_data_value: 255,
      round: true
    })([1275, 2314, 4311]),
    [5, 9, 17]
  );
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [0, 65536],
        [0, 65536],
        [0, 65536]
      ],
      new_no_data_value: 255,
      round: true
    })([1275, 2314, 4311, 52311, 542622]),
    [5, 9, 17]
  );

  // edge cases where second band is all the same value, so range is zero
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [2314, 2314]
      ]
    })([1275, 2314]),
    [5, 255, 0]
  );
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [2314, 2314]
      ],
      new_no_data_value: 255
    })([1275, 2314]),
    [5, 254, 0]
  );
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [2314, 2314]
      ],
      new_no_data_value: 0
    })([1275, 2314]),
    [6, 255, 0]
  );
  eq(
    rawToRgb({
      ranges: [
        [0, 65536],
        [2314, 2314]
      ],
      new_no_data_value: 255,
      flip: true
    })([1275, 2314]),
    [249, 254, 0]
  );
});

test("no data pixel", ({ eq }) => {
  const new_no_data_pixel: [255, 0, 0] = [255, 0, 0]; // red
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_pixel })([65536]), [255, 255, 255]);
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_pixel, old_no_data_value: 0 })([0]), [255, 0, 0]);
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_pixel, old_no_data_value: 0 })([65536]), [255, 255, 255]);
  eq(rawToRgb({ ranges: [[0, 65536]], new_no_data_pixel })([0]), [0, 0, 0]);
});
