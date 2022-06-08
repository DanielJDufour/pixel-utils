import test from "flug";

import hasNoData from "./index";

test("hasNoData", ({ eq }) => {
  eq(hasNoData(null, [123, 53, 65, 255]), false);
  eq(hasNoData(0, [123, 123, 123, 52, 65, 0]), true);
});
