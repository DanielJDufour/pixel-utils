import test from "flug";

import rgbaToRgb from "./index";

test("convert RGBA pixel to an RGB pixel", ({ eq }) => {
  eq(rgbaToRgb()([0, 0, 0, 255]), [0, 0, 0]);
  eq(rgbaToRgb()([4, 5, 1, 255]), [4, 5, 1]);
  eq(rgbaToRgb()([0, 0, 0, 127]), [0, 0, 0]);
  eq(rgbaToRgb({ new_no_data_value: 0 })([4, 5, 1, 0]), [0, 0, 0]); // hidden to 0 no data pixel
  eq(rgbaToRgb({ new_no_data_value: 255 })([4, 5, 1, 0]), [255, 255, 255]); // hidden to 255 no data pixel
});
