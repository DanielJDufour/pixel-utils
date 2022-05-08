# `rawToRgb`
> convert a raw pixel value to RGB

## description
You would normally want to convert a raw pixel value to an RGB 3-Band pixel when you
are looking to save your pixel to a JPG file, because JPG doesn't support a transparency channel.

## usage
```js
import { rawToRgb } from "pixel-utils";

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
