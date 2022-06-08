import test from "flug";
import addAlpha from "./index";

test("add alpha channel to valid RGB", ({ eq }) => {
  eq(addAlpha([0, 42, 52]), [0, 42, 52, 255]);
});

// test("add alpha channel to invalid RGB", ({ eq }) => {
//   eq(addAlpha([null, 42, 52]), [null, 42, 52, 255]);
// });
