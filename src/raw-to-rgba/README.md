# `rawToRgba`
> convert a raw pixel value to RGBA

## description
You normally want to convert a raw pixel to an RGBA 3-Band pixel when you
are looking to save your pixel to a PNG file, HTML canvas, or another
representation that supports an alpha band (transparency channel).

## usage
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
