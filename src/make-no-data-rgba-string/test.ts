import test from "flug";

import makeNoDataRgbaString from "./index";

test("make no-data RGBA String", ({ eq }) => {
  eq(makeNoDataRgbaString(0), "rgba(0, 0, 0, 0)");
  eq(makeNoDataRgbaString(255), "rgba(255, 255, 255, 0)");
});
