import test from "flug";
import isHidden from "./index";

test("isHidden", ({ eq }) => {
  eq(isHidden([0, 4, 5, 0]), true);
  eq(isHidden([0, 4, 5, 12]), false);
  eq(isHidden([0, 4, 5, 255]), false);
  eq(isHidden([null, 4, 5, 0]), true);
  eq(isHidden([null, 4, 5, 255]), false);
});
