import test from "flug";
import setHidden from "./index";

import type { VALID_RGBA } from "../types";

test("setHidden", ({ eq }) => {
  // pass in tuple
  eq(setHidden([12, 45, 54, 5]), [12, 45, 54, 0]);

  const pixel: VALID_RGBA = [255, 45, 4, 5];
  eq(setHidden(pixel), [255, 45, 4, 0]);
});
