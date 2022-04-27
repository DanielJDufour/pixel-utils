import test from "flug";
import {
  has_no_data_value,
  hide_rgba,
  convert_raw_to_rgb,
  convert_raw_to_rgba,
  convert_rgb_to_rgba,
  convert_rgba_to_rgb,
  create_nodata_rgb,
  create_nodata_rgba,
  scale_number,
  scale_band_value,
  scale_band_value_holding_bottom,
  scale_band_value_holding_top,
  show_rgba
} from "./pixel-converters.js";

test("convert rgb to rgba", ({ eq }) => {
  eq(convert_rgb_to_rgba([12, 52, 163]), [12, 52, 163, 255]);
});

test("scale_number", ({ eq }) => {
  eq(scale_number(1378, 900, 12633, 0, 255), 10);
});

test("scaling pixel band value without holding", ({ eq }) => {
  eq(scale_band_value(1378, 900, 12633), 9);
});

test("scaling pixel band value holding bottom", ({ eq }) => {
  eq(scale_band_value_holding_bottom(1378, 900, 12633), 10);
});

test("scaling pixel band value holding top", ({ eq }) => {
  eq(scale_band_value_holding_top(1378, 900, 12633), 9);
});

test("hide_rgba", ({ eq }) => {
  eq(hide_rgba([123, 53, 65, 255]), [123, 53, 65, 0]);
  eq(hide_rgba([123, 53, 65, 0]), [123, 53, 65, 0]); // already hidden
});

test("show_rgba", ({ eq }) => {
  eq(show_rgba([123, 53, 65, 255]), [123, 53, 65, 255]); // already visible
  eq(show_rgba([123, 53, 65, 0]), [123, 53, 65, 255]);
});

test("create_nodata_rgb", ({ eq }) => {
  eq(create_nodata_rgb(0), [0, 0, 0]);
  eq(create_nodata_rgb(255), [255, 255, 255]);
});

test("create_nodata_rgba", ({ eq }) => {
  eq(create_nodata_rgba(0), [0, 0, 0, 0]);
  eq(create_nodata_rgba(255), [255, 255, 255, 255]);
});

test("convert_rgb_to_rgba", ({ eq }) => {
  eq(convert_rgb_to_rgba([0, 0, 0]), [0, 0, 0, 255]);
  eq(convert_rgb_to_rgba([0, 0, 0], 0), [0, 0, 0, 0]);
  eq(convert_rgb_to_rgba([36, 12, 43]), [36, 12, 43, 255]);

  // JPG-like 3-band pixel where 255 is a no data value
  // hide the pixel when converting it to RGBA
  eq(convert_rgb_to_rgba([255, 12, 43], 255), [255, 12, 43, 0]);
});

test("has_no_data_value", ({ eq }) => {
  eq(has_no_data_value([0, 0, 0], 0), true);
  eq(has_no_data_value([0, 0, 0]), false);
  eq(has_no_data_value([0, 0, 0], null), false);
});

test("convert_rgba_to_rgb", ({ eq }) => {
  eq(convert_rgba_to_rgb([0, 0, 0, 255]), [0, 0, 0]);
  eq(convert_rgba_to_rgb([4, 5, 1, 255]), [4, 5, 1]);
  eq(convert_rgba_to_rgb([0, 0, 0, 127]), [0, 0, 0]);
  eq(convert_rgba_to_rgb([4, 5, 1, 0], 0), [0, 0, 0]); // hidden to 0 no data pixel
  eq(convert_rgba_to_rgb([4, 5, 1, 0], 255), [255, 255, 255]); // hidden to 255 no data pixel
});

test("convert_raw_to_rgb", ({ eq }) => {
  eq(convert_raw_to_rgb([1234], [0], [65536]), [4, 4, 4]);
  eq(convert_raw_to_rgb([65536], [0], [65536]), [255, 255, 255]);
  eq(convert_raw_to_rgb([65536], [0], [65536], null, 255), [254, 254, 254]); // 255 is the new no data value
  eq(convert_raw_to_rgb([0], [0], [65536], null, 0), [1, 1, 1]); // 0 is the new no data value
  eq(convert_raw_to_rgb([0], [0], [65536], null, 0), [1, 1, 1]); // 0 is the new no data value
  eq(convert_raw_to_rgb([1275, 2314, 4311, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], null, 0), [5, 10, 17]); // 255 is the new no data value

  // edge case where second band is all the same value, so range is zero
  // in this case just choose the higheest valid non-nodata value
  eq(convert_raw_to_rgb([1275, 2314], [0, 0], [65536, 0]), [4, 255, 0]);
  eq(convert_raw_to_rgb([1275, 2314], [0, 0], [65536, 0], null, 255), [4, 254, 0]);
  eq(convert_raw_to_rgb([1275, 2314], [0, 0], [65536, 0], null, 0), [5, 255, 0]);
});

test("convert_raw_to_rgba", ({ eq }) => {
  eq(convert_raw_to_rgba([1234], [0], [65536]), [4, 4, 4, 255]);
  eq(convert_raw_to_rgba([65536], [0], [65536]), [255, 255, 255, 255]);

  // 255 is the new no data value, but the no data value doesn't apply to the alpha/transparency channel
  eq(convert_raw_to_rgba([65536], [0], [65536], null, 255), [254, 254, 254, 255]);

  eq(convert_raw_to_rgba([0], [0], [65536], null, 0), [1, 1, 1, 255]);
  eq(convert_raw_to_rgba([0], [0], [65536], null, 0), [1, 1, 1, 255]);
  eq(convert_raw_to_rgba([1275, 2314, 4311, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], null, 0), [5, 10, 17, 255]); // 255 is the new no data value
  eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, 255), [4, 8, 255, 0]); // 65536 is the old no data value and 255 the new no data value
  eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, 0), [5, 10, 0, 0]); // 65536 is the old no data value and zero the new no data value
  eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, undefined), [4, 9, 255, 0]); // 65536 is the old no data value and there is no new no data value
});

test("examples", ({ eq }) => {
  const pixel = [5901];
  const min = 0;
  const max = 62196;
  const old_no_data_value = 65536;
  eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value), [24, 24, 24]);
  eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 0), [25, 25, 25]);
  eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 255), [24, 24, 24]);
  eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value), [24, 24, 24, 255]);
  eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 0), [25, 25, 25, 255]);
  eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 255), [24, 24, 24, 255]);
});
