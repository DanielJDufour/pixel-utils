import test from "flug";

import hideRGBA from "./index";

test("hide_rgba", ({ eq }) => {
  eq(hideRGBA([123, 53, 65, 255]), [123, 53, 65, 0]);
  eq(hideRGBA([123, 53, 65, 0]), [123, 53, 65, 0]); // already hidden
});
