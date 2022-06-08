import test from "flug";

import makeNoDataRgba from "./index";

test("make no-data RGBA", ({ eq }) => {
  eq(makeNoDataRgba(0), [0, 0, 0, 0]);
  eq(makeNoDataRgba(255), [255, 255, 255, 0]);
});
