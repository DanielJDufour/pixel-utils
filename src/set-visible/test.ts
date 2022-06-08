import test from "flug";
import setVisible from "./index";

test("setVisible", ({ eq }) => {
  eq(setVisible([12, 45, 54, 0]), [12, 45, 54, 255]);
  eq(setVisible([255, 45, 4, null]), [255, 45, 4, 255]);
});
