# `rawToRgba`
> convert a raw pixel value to RGBA

## description
You normally want to convert a raw pixel to an RGBA 3-Band pixel when you
are looking to save your pixel to a PNG file, HTML canvas, or another
representation that supports an alpha band (transparency channel).

## usage
```js
import { rawToRgba } from "pixel-utils";

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

### no_data_strategy
By default, rawToRgba will scale evey valid band.  If you want all bands to be treated as no data
if any band is no data, set no_data_strategy to "all".  The default is "partial".
```js
// if any no data value is encountered
// set red, green, and blue to the no data value
rawToRgba({ ranges, old_no_data_value, new_no_data_value: 0, no_data_strategy: "all" })(pixel);
[0, 0, 0, 0]
```