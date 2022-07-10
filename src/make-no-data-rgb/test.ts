import test from "flug";

import makeNoDataRgb from "./index";

test("make a no-data RGB pixel", ({ eq }) => {
  eq(makeNoDataRgb(null), [null, null, null]);
  eq(makeNoDataRgb(0), [0, 0, 0]);
  eq(makeNoDataRgb(255), [255, 255, 255]);
});
