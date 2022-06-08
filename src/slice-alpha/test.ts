import test from "flug";
import sliceAlpha from "./index";

test("sliceAlpha", ({ eq }) => {
  const pixel: [number, number, number, number] | [number, number, number] = [123, 3, 52, 41];
  eq(sliceAlpha(pixel), [123, 3, 52]);
});
