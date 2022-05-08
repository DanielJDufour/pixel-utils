import * as test from "flug";
import range from "./index";

test("range", ({ eq }) => {
  eq(range(0), []);
  eq(range(1), [0]);
  eq(range(6), [0, 1, 2, 3, 4, 5]);
});
