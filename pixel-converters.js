// scale an integer from an old range to a new range
export function scale_number(n, old_min, old_range, new_min, new_range) {
  return Math.round(new_min + (new_range * (n - old_min)) / old_range);
}

export function scale_band_value(n, old_min, old_range) {
  return old_range === 0 ? 255 : scale_number(n, old_min, old_range, -0.5, 255.4999999999);
}

// given an unscaled pixel band value
// scale it to between 1 and 255
// holding the value of zero as a no data value
export function scale_band_value_holding_bottom(n, old_min, old_range) {
  return old_range === 0 ? 255 : scale_number(n, old_min, old_range, 0.5, 255.4999999999);
}

// given an unscaled pixel band value
// scale it to between 0 and 254
// holding the value of 255 as a no data value
export function scale_band_value_holding_top(n, old_min, old_range) {
  return old_range === 0 ? 254 : scale_number(n, old_min, old_range, -0.5, 254.4999999999);
}

// given a (scaled) rgba value
// make it transparent
export function hide_rgba([r, g, b]) {
  return [r, g, b, 0];
}

// given a (scaled) rgba value
// make it transparent
export function show_rgba([r, g, b]) {
  return [r, g, b, 255];
}

// create an RGB pixel representing no data
export function create_nodata_rgb(nodata) {
  return [nodata, nodata, nodata];
}

// create an RGBA pixel representing no data
export function create_nodata_rgba(nodata) {
  return [nodata, nodata, nodata, nodata];
}

// given a scaled RGB pixel
// no data can be undefined, zero or 255
export function convert_rgb_to_rgba(pixel, nodata) {
  const [r, g, b] = pixel;
  return [r, g, b, pixel.includes(nodata) ? 0 : 255];
}

// should we only check first 3 bands in rgba?
export function has_no_data_value(pixel, nodata) {
  return pixel.some(n => n === nodata);
}

// converting from RGBA to RGB
// where we no longer have an alpha value
// assuming pixel is already scaled
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

// convert a raw unprocessd pixel (no alpha band) to an RGB value
export function convert_raw_to_rgb(pixel, mins, ranges, old_nodata, new_nodata) {
  let num_bands = pixel.length;

  if (pixel.includes(old_nodata)) {
    if (!new_nodata) throw new Error("can't make a no data rgb pixel without a new_nodata set");
    return create_nodata_rgb(new_nodata);
  }

  // selecting the first 3 bands and ignoring the rest
  if (num_bands > 3) {
    pixel = pixel.slice(0, 3);
    num_bands = 3;
  }

  let scale = scale_band_value;
  if (new_nodata === 0) scale = scale_band_value_holding_bottom;
  else if (new_nodata === 255) scale = scale_band_value_holding_top;

  if (num_bands === 1) {
    const n = scale(pixel[0], mins[0], ranges[0]);
    return [n, n, n];
  } else if (num_bands === 2) {
    const r = scale(pixel[0], mins[0], ranges[0]);
    const g = scale(pixel[1], mins[1], ranges[1]);
    return [r, g, 0];
  } else if (num_bands === 3) {
    return pixel.map((n, i) => scale(n, mins[i], ranges[i]));
  }
}

// when converting from unprocessed to rgba
// can set a no data value and have alpha change
export function convert_raw_to_rgba(pixel, mins, ranges, old_nodata, new_nodata) {
  let num_bands = pixel.length;

  // selecting the first 3 bands and ignoring the rest
  if (num_bands > 3) {
    pixel = pixel.slice(0, 3);
    num_bands = 3;
  }

  const alpha = pixel.includes(old_nodata) ? 0 : 255;

  let scale = scale_band_value;
  if (new_nodata === 0) {
    scale = scale_band_value_holding_bottom;
  } else if (new_nodata === 255) {
    scale = scale_band_value_holding_top;
  }

  if (num_bands === 1) {
    let n = pixel[0];
    n = n === old_nodata && typeof new_nodata === "number" ? new_nodata : scale(n, mins[0], ranges[0]);
    return [n, n, n, alpha];
  } else if (num_bands === 2) {
    let out = pixel.map((n, i) => (n === old_nodata && typeof new_nodata === "number" ? new_nodata : scale(n, mins[i], ranges[i])));
    out.push(0); // b
    out.push(alpha);
    return out;
  } else if (num_bands === 3) {
    let out = pixel.map((n, i) => (n === old_nodata && typeof new_nodata === "number" ? new_nodata : scale(n, mins[i], ranges[i])));
    out.push(alpha);
    return out;
  }
}
