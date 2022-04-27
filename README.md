__beta version__
# pixel-converters:
Simple conversion of pixels to RGB and RGBA, including automatic scaling and no data values.

## features
- immutable

## core assumptions and constraints
An RGB pixel has these assumed properties:
- array of 3 numbers between zero and 255
- no data values represented by [0, 0, 0] or [255, 255, 255]

An RGBA pixel has these assumed properties:
- array of 4 numbers between zero and 255
- the first 3 numbers are "data" values and the last value is an alpha tranparency value
- an alpha value of 0 indicates that at least one of the data bands is "no data"
- there may be a per-band no data value, but it is not required

A raw (unscaled) pixel value has these assumed properties:
- between 1 and inifinity number of bands
- number can be any valid number
- no data value is the same for each band
- there is no transparency channel/band

## install
```bash
npm install pixel-converters
```

## functions
- convert_raw_to_rgb
- convert_raw_to_rgba
- convert_rgb_to_rgba
- convert_rgba_to_rgb
- create_nodata_rgb
- create_nodata_rgba
- has_no_data_value
- hide_rgba
- scale_number
- scale_band_value
- scale_band_value_holding_bottom
- scale_band_value_holding_top
- show_rgba

## usage
### convert_raw_to_rgb
You normally want to convert a raw pixel to an RGB 3-Band pixel when you
are looking to save your pixel to a JPG file.
```js
import { convert_raw_to_rgb } from "pixel-converters";

// example is a pixel in a Landsat 8 scene
const pixel = [5901];
const min = 0;
const max = 62196;
const old_no_data_value = 65536;
convert_raw_to_rgb(pixel, [min], [max], old_no_data_value);
[24, 24, 24]

// if you want to hold zero as the new no data value
// in other words, a no data pixel will be [0, 0, 0]
// because zero is taken, it will push all the scaled values up
convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 0);
[24, 24, 24]

// if you want your no data pixel to be pure white ([255, 255, 255])
// you can set the new no data value to 255
// this will push all the scaled pixel values down
convert_raw_to_rgb(pixel, [min], [max], old_no_data_value, 255);
[24, 24, 24]
```

### convert_raw_to_rgba
You normally want to convert a raw pixel to an RGB 3-Band pixel when you
are looking to save your pixel to a PNG file, HTML canvas, or another
representation that supports an alpha band (transparency channel).
```js
import { convert_raw_to_rgba } from "pixel-converters";

// using same pixel as above
convert_raw_to_rgba(pixel, [min], [max], old_no_data_value);
[24, 24, 24, 255]

// using same pixel as above, but reserving 0 for the new no data value
convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 0);
[24, 24, 24, 255]

// using same pixel as above, but reserving 255 for the new no data value
convert_raw_to_rgba(pixel, [min], [max], old_no_data_value, 255);
[24, 24, 24, 255]
```

### more documentation coming soon
as time permits...
