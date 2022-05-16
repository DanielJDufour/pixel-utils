# `selectPixel`
> select a pixel from a multi-dimensional image data array

## description
Raw image data can come in a lot of forms.  Sometimes it's separated by bands as in [geotiff.js](https://github.com/geotiffjs/geotiff.js) or sometimes it's flattened into one array as in [ImageData.data](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data).  `selectPixel` returns a highly-optimized universal function for selecting
a pixel by row and column regardless of the array layout of the source data.

## usage
```js
import { selectPixel } from "pixel-utils";

// example is data from a Landsat 8 scene
// where each band is its own array
const height = 1231;
const width = 1232;

const select = selectPixel(data, {
  depth: 9, // number of bands
  height,
  layout: "[band][row,column]", // pixels separated by band
  width
});

// select function signature is
// select(row index, column index)
// with row index of zero at the top

select(0, 0); // top-left pixel
[24, 41, 42, 53, 42, 53, 53, 12, 52]

select(0, width - 1); // top-right pixel
select(height - 1, 0); // bottom-left pixel
select(height - 1, width - 1); // bottom-right pixel
```
