import test from "flug";

import rgbToRgba from "./index";

test("create_converter_for_rgb_to_rgba", ({ eq }) => {
  eq(rgbToRgba()([0, 0, 0]), [0, 0, 0, 255]);
  eq(rgbToRgba()([36, 12, 43]), [36, 12, 43, 255]);
  eq(rgbToRgba({ old_no_data_value: 0, new_no_data_value: 0 })([0, 0, 0]), [0, 0, 0, 0]);
});
