import { createScaleFunction } from "quick-scale";

const is_no_data_rgb_pixel = require("./is-no-data/index.js");
const is_no_data_rgba_pixel = require("./identifiers/is-no-data-rgba-pixel.js");

const pop_alpha = require("./set-invisible/pop-alpha.js.js");
const safely_remove_alpha_channel = require("./set-invisible/slice-alpha.js.js");


// mutates input data




// no data can be undefined, zero or 255
export function convert_rgb_to_rgba(pixel, { old_no_data_value, new_no_data_value } = {}) {
  return create_converter_for_rgb_to_rgba({ old_no_data_value, new_no_data_value })(pixel);
}




export function convert_rgba_to_rgb(pixel, nodata) {
  // don't care about no data value for RGBA
  // because alpha band is assumed set to zero
  // if there is a no data value present
  if (pixel[3] === 0) {
    return create_nodata_rgb(nodata);
  } else {
    const [r, g, b, a] = pixel;
    return [r, g, b];
  }
}

export function slice_and_convert (convert, pixel) {
  return pixel.slice(0, 3).map(n => convert(n));
}

// when converting from unprocessed to rgba
// can set a no data value and have alpha change
export function convert_raw_to_rgba(pixel, mins, ranges, old_no_data_value, new_no_data_value) {
  return create_raw_to_rgba({
    flip: false,
    new_no_data_value,
    old_no_data_value,
    ranges: mins.map((m, i) => [m, m + ranges[i]]),
  })(pixel);
}
