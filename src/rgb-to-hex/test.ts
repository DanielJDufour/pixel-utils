import test from "flug";
import rgbToHex from "./index";

test("rgbToHex", ({ eq }) => {
  eq(rgbToHex([null, 255, 255]), "#00ffff");
  eq(rgbToHex([0, 0, 0]), "#000000");
  eq(rgbToHex([255, 255, 255]), "#ffffff");
});
