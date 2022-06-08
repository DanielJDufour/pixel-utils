import { readFileSync } from "fs";

import test from "flug";
// @ts-ignore
import * as readim from "readim";
import { transform } from "xdim";

import selectPixel from "./index";

(async () => {
  const buf = readFileSync("./src/select-pixel/flower.png");
  const { pixels, height, width } = await readim({ data: buf });
  const depth = 4; // PNG (RGBA)

  const layouts = ["[band][row][column]", "[band][row,column]", "[band,row,column]", "[row][column][band]", "[row][column,band]", "[row,column,band]"];

  layouts.forEach(layout => {
    test("select pixel from " + layout, ({ eq }) => {
      const { data } = transform({
        data: pixels,
        from: "[row,column,band]",
        to: layout,
        sizes: {
          band: 4,
          row: height,
          column: width
        }
      });

      const select = selectPixel(data, { depth, height, layout, width });
      eq(select(0, 0), [52, 70, 42, 255]); // top left
      eq(select(0, width - 1), [33, 44, 28, 255]); // top right
      eq(select(height - 1, 0), [47, 77, 28, 255]); // bottom left
      eq(select(height - 1, width - 1), [37, 51, 25, 255]); // bottom right
    });
  });
})();
