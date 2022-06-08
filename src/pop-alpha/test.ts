import test from "flug";
import popAlpha from "./index";

test("popAlpha", ({ eq }) => {
  const pixel: [number, number, number, number] | [number, number, number] = [21, 43, 53, 2];
  eq(popAlpha(pixel), [21, 43, 53]);
  eq(pixel, [21, 43, 53]);
  eq(popAlpha([null, 12, 42, null]), [null, 12, 42]);
});
