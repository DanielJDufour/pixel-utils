# pxutil
> Utility Functions for Pixels

## features
- immutable and immutable options
- no data values
- optimized for speed
- range flipping
- simple conversion between RGB and RGBA

## functions
- **conversion**
  - `rawToRgb` - convert a raw unprocessed pixel value to RGBA
  - `rawToRgba` - convert a raw unprocessed pixel value to RGB
  - `rgbToRgba` - convert from RGB to RGBA
  - `rgbaToRgb` - convert from RGBA to RGB
- **no data**
  - `makeNoDataRgb` - create a no data RGB pixel
  - `makeNoDataRgba` - create a no data RGB pixel
- **transparency**
  - `addAlpha` - add an alpha transparency channel
  - `isHidden` - check if an RGBA pixel is transparent
  - `setHidden` - mutates input pixel, setting alpha channel to visible
  - `showRGBA` - make RGBA visible

## core assumptions and constraints
An RGB pixel has these assumed properties:
- array of 3 numbers between zero and 255
- no data is represented by either black or white

An RGBA pixel has these assumed properties:
- array of 4 numbers between zero and 255
- the first 3 numbers are "data" values and the last value is an alpha tranparency value
- an alpha value of 0 indicates that at least one of the data bands is "no data"
- there may be a per-band no data value, but it is not required

A raw (unscaled) pixel value has these assumed properties:
- between 1 and inifinity number of bands
- number can be any valid number
- no data value must be the same for each band (we don't love this, but it's a common constraint)
- there is no transparency channel/band (we may work to remove this constraint)

## install
```bash
npm install pixel-converters
```

## usage
### convert a raw pixel value to an RGB
You normally want to convert a raw pixel value to an RGB 3-Band pixel when you
are looking to save your pixel to a JPG file.
```js
import { rawToRgb } from "pixel-converters";

// example is a pixel in a Landsat 8 scene
const pixel = [5901];
const min = 0;
const max = 62196;
const range = [0, 62196];
const ranges = [ range ];
const old_no_data_value = 65536;
const convert = rawToRgb({ ranges, old_no_data_value });
convert(pixel);
[24, 24, 24]

// if you want to hold zero as the new no data value
// in other words, a no data pixel will be [0, 0, 0]
// because zero is taken, it will push all the scaled values up
rawToRgb({ ranges, old_no_data_value, new_no_data_value: 0 });
[24, 24, 24]

// if you want your no data pixel to be pure white ([255, 255, 255])
// you can set the new no data value to 255
// this will push all the scaled pixel values down
rawToRgb({ ranges, old_no_data_value, new_no_data_value: 255 });
[24, 24, 24]

// if you want to flip your pixel values so that as the raw pixel value
// increases the processed result gets darker, pass in true at the end of the params
rawToRgb({ ranges, flip: true });
[24, 24, 24]
```

### convert a raw pixel value to an RGBA
You normally want to convert a raw pixel to an RGBA 3-Band pixel when you
are looking to save your pixel to a PNG file, HTML canvas, or another
representation that supports an alpha band (transparency channel).
```js
import { rawToRgba } from "pixel-converters";

// using same pixel as above
rawToRgba({ ranges, old_no_data_value })(pixel);
[24, 24, 24, 255]

// using same pixel as above, but reserving 0 for the new no data value
rawToRgba({ ranges, old_no_data_value, new_no_data_value: 0 })(pixel);
[24, 24, 24, 255]

// using same pixel as above, but reserving 255 for the new no data value
rawToRgba({ ranges, old_no_data_value, new_no_data_value: 255 })(pixel);
[24, 24, 24, 255]
```
