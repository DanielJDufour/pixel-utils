import test from "flug";
import {
  has_no_data_value,
  hide_rgba,
  convert_raw_to_rgba,
  convert_rgb_to_rgba,
  convert_rgba_to_rgb,
  create_nodata_rgb,
  create_nodata_rgba,
  create_raw_to_rgb,
  create_raw_to_rgba,

  create_converter_for_rgb_to_rgba,

  
  convert_three_band_pixel_to_rgb,

  convert_one_band_pixel_to_rgba,
  convert_two_band_pixel_to_rgba,
  convert_multi_band_pixel_to_rgba,

  range,
  show_rgba
} from "./pixel-converters.js";



const scale_uint16 = n => Math.round(n * 255 / Math.pow(2, 16));

const RANGE_U16 = [0, Math.pow(2, 16)];
const RANGE_U16_5X = range(5).map(() => RANGE_U16);


// test("convert rgb to rgba", ({ eq }) => {
//   eq(convert_rgb_to_rgba([12, 52, 163]), [12, 52, 163, 255]);
// });





// test("has_no_data_value", ({ eq }) => {
//   eq(has_no_data_value([0, 0, 0], 0), true);
//   eq(has_no_data_value([0, 0, 0]), false);
//   eq(has_no_data_value([0, 0, 0], null), false);
// });

test("convert_rgba_to_rgb", ({ eq }) => {
  eq(convert_rgba_to_rgb([0, 0, 0, 255]), [0, 0, 0]);
  eq(convert_rgba_to_rgb([4, 5, 1, 255]), [4, 5, 1]);
  eq(convert_rgba_to_rgb([0, 0, 0, 127]), [0, 0, 0]);
  eq(convert_rgba_to_rgb([4, 5, 1, 0], 0), [0, 0, 0]); // hidden to 0 no data pixel
  eq(convert_rgba_to_rgb([4, 5, 1, 0], 255), [255, 255, 255]); // hidden to 255 no data pixel
});


// test("convert_raw_to_rgba", ({ eq }) => {
//   eq(convert_raw_to_rgba([1234], [0], [65536]), [5, 5, 5, 255]);
//   eq(convert_raw_to_rgba([65536], [0], [65536]), [255, 255, 255, 255]);

//   // 255 is the new no data value, but the no data value doesn't apply to the alpha/transparency channel
//   eq(convert_raw_to_rgba([65536], [0], [65536], null, 255), [254, 254, 254, 255]);

//   eq(convert_raw_to_rgba([0], [0], [65536], null, 0), [1, 1, 1, 255]);
//   eq(convert_raw_to_rgba([0], [0], [65536], null, 0), [1, 1, 1, 255]);
//   eq(convert_raw_to_rgba([1275, 2314, 4311, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], null, 0), [5, 10, 17, 255]); // 255 is the new no data value
//   eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, 255), [4, 8, 255, 0]); // 65536 is the old no data value and 255 the new no data value
//   eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, 0), [5, 10, 0, 0]); // 65536 is the old no data value and zero the new no data value
//   eq(convert_raw_to_rgba([1275, 2314, 65536, 52311, 542622], [0, 0, 0, 0], [65536, 65536, 65536, 65536], 65536, undefined), [4, 9, 255, 0]); // 65536 is the old no data value and there is no new no data value
// });

// test("examples", ({ eq }) => {
//   const pixel = [5901];
//   const min = 0;
//   const max = 62196;
//   const old_no_data_value = 65536;
//   eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value), [24, 24, 24]);
//   eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 0), [25, 25, 25]);
//   eq(convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 255), [24, 24, 24]);
//   eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value), [24, 24, 24, 255]);
//   eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 0), [25, 25, 25, 255]);
//   eq(convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 255), [24, 24, 24, 255]);
// });
