import test from "flug";
import showRGBA from "../show-rgba";

test("showRGBA", ({ eq }) => {
  eq(showRGBA([123, 53, 65, 255]), [123, 53, 65, 255]); // already visible
  eq(showRGBA([123, 53, 65, 0]), [123, 53, 65, 255]);
});
